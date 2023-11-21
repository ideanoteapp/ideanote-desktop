module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./app.ico",
    name: "ideaNote",
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
        description: "A note-taking app",
      },
    },
    {
      name: '@electron-forge/maker-appx',
      config: {
        publisher: 'CN=Korange'
      }
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
