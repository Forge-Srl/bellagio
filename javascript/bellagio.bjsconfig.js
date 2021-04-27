const path = require('path')

module.exports = {
    projectName: "Bellagio",
    guestDirPath: path.resolve(__dirname),
    guestBundles: {
        MainBundle: { 
            entryPaths: ['./index'],
        },
    },
    outputMode: "development",
    hostProjects: [{
        language: "java",
        projectPath: path.resolve(__dirname, "../android/app"),
        srcDirName: "src",
        basePackage: "srl.forge.bellagio",
        hostPackage: "js",
        targetBundles: {
            MainBundle: {
                sourceSets: ["bellagio"],
            }
        }
    }],
}