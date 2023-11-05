module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./app.ico",
    name: "ideaNote beta",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        loadingGif: "./build/Installer.gif",
        iconUrl: "https://media.korange.work/ideanote.ico",
        setupIcon: "./app.ico",
        authors: "Korange",
        description: "Beta version of ideaNote",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
