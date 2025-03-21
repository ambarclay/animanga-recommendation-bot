require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "anime",
    description: "responds with a random anime recommendation (can be NSFW)",
  },
  {
    name: "manga",
    description: "responds with a random manga recommendation (can be NSFW)",
  },
  {
    name: "horny-anime",
    description: "sends a SPICY anime recommendation (NSFW)",
  },
  {
    name: "horny-manga",
    description: "sends a SPICY manga recommendation (NSFW)",
  },
  {
    name: "clean-anime",
    description: "sends a CLEAN anime recommendation (SFW)",
  },
  {
    name: "clean-manga",
    description: "sends a CLEAN manga recommendation (SFW)",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
