const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdirp = require("readdirp");
const JavaScriptObfuscator = require("javascript-obfuscator");
var excludedDir = ["!node_modules", "!plugins"];

// listing all the '.js' files
const getJsFiles = async (directory, func_dir) => {
  if (func_dir) {
    excludedDir.push(`!${func_dir}`);
  }
  const files = await readdirp.promise(directory, {
    fileFilter: "*.js",
    directoryFilter: excludedDir,
  });
  return files.map((file) => file.fullPath);
};

// Reading the files -> obfuscating the code -> Writing the obfuscated code
const obfuscateCode = async (filePath, custom, utils) => {
  var file = await readFile(filePath, "utf8");
  try {
    var obfuscationResult = JavaScriptObfuscator.obfuscate(file, {
      compact: custom[0],
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: custom[1],
      simplify: custom[2],
      shuffleStringArray: custom[3],
      splitStrings: custom[4],
    });
  } catch (error) {
    return utils.build.failBuild(`Failed to Obfuscate '${filePath}' .`, { error });
  }
  await writeFile(filePath, obfuscationResult.getObfuscatedCode());
  return 1;
};
module.exports = {
  onPostBuild: async ({ inputs, constants, utils }) => {
    const jsFiles = await getJsFiles(
      constants.PUBLISH_DIR,
      constants.FUNCTIONS_SRC
    );
    for (const filePath of jsFiles) {
      console.log(filePath);
      await obfuscateCode(
        filePath,
        [
          inputs.compact,
          inputs.numbersToExpressions,
          inputs.simplify,
          inputs.shuffleStringArray,
          inputs.splitStrings,
        ],
        utils
      );
    }
    console.log("JS files successfully Obfuscated!");
  },
};
