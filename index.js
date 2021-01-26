const fs = require("fs"); 
const readdirp = require("readdirp"); 
var JavaScriptObfuscator = require("javascript-obfuscator"); 

// listing all the '.js' files 
const getJsFiles = async (directory, func_dir) => {
  const files = await readdirp.promise(directory, {
    fileFilter: "*.js",
    directoryFilter: ["!node_modules", "!plugins", `!${func_dir}`],
  });
  return files.map((file) => file.fullPath);
};

// Reading the files -> obfuscating the code -> Writing the obfuscated code
const obfuscateCode = async (filePath, custom) => {
  var file = fs.readFileSync(filePath, "utf8");
  var obfuscationResult = await JavaScriptObfuscator.obfuscate(file, {
    compact: custom[0],
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: custom[1],
    simplify: custom[2],
    shuffleStringArray: custom[3],
    splitStrings: custom[4],
  });
  await fs.writeFile(
    filePath,
    obfuscationResult.getObfuscatedCode(),
    function (err) {
      if (err) {
        return 0;
      }
    }
  );
  return 1;
};
module.exports = {
  onPostBuild: async ({ inputs, constants, utils }) => {
    const jsFiles = await getJsFiles(
      constants.PUBLISH_DIR,
      constants.FUNCTIONS_SRC
    );
    try {
      for (const filePath of jsFiles) {
        console.log(filePath);
        await obfuscateCode(filePath, [
          inputs.compact,
          inputs.numbersToExpressions,
          inputs.simplify,
          inputs.shuffleStringArray,
          inputs.splitStrings,
        ]);
      }
      console.log("JS files successfully Obfuscated!");
    } catch (error) {
      return utils.build.failBuild("Failed to Obfuscate JS.", { error });
    }
  },
};
