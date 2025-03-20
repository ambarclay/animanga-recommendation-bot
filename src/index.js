require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const jikanjs = require("@mateoaranda/jikanjs");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

client.on("ready", (c) => {
  console.log(`🟢 ${c.user.tag} is online!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "anime") {
    try {
      const animeName = await jikanjs.loadRandom("anime");

      let { title, url, type, status, episodes, duration, title_english, synopsis } = animeName.data;
      let image = animeName.data.images.jpg.image_url;
      let genreList = animeName.data.genres.map((g) => g.name).join(", ");

      if (title_english === null) {
        title_english = "n/a";
      }
      if (type === null) {
        type = "n/a";
      }
      if (episodes === null) {
        episodes = "?";
      }
      if (genreList === "") {
        genreList = "n/a";
      }
      if (!duration) {
        duration = "?";
      }
      if (!status) {
        status = "?";
      }
      if (synopsis === null) {
        synopsis = "Go to MyAnimeList to learn more!";
      }
      if (synopsis.length > 350) {
        synopsis = synopsis.slice(0, 350) + "...";
      }

      episodes = episodes.toString();

      const animeEmbed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(synopsis)
        .setThumbnail(image)
        .addFields(
          { name: "English Title", value: `*${title_english}*`, inline: true },
          { name: "Genre", value: genreList, inline: true },
          { name: "Type", value: type, inline: true }
        )
        .addFields(
          { name: "Episodes", value: episodes, inline: true },
          { name: "Duration", value: duration, inline: true },
          { name: "Status", value: status, inline: true }
        )
        .setColor("Random");

      interaction.reply({ embeds: [animeEmbed] });
    } catch (error) {
      console.log(error);
      interaction.reply(`Sorry, I couldn't find something for you...\n*pls get <@411906843825405967> if I keep breaking* 🥺👉👈`);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "manga") {
    try {
      const mangaName = await jikanjs.loadRandom("manga");
      let { title, url, type, status, chapters, title_english, synopsis } = mangaName.data;
      let image = mangaName.data.images.jpg.image_url;
      let genreList = mangaName.data.genres.map((g) => g.name).join(", ");

      if (title_english === null) {
        title_english = "n/a";
      }
      if (type === null) {
        type = "n/a";
      }
      if (chapters === null) {
        chapters = "?";
      }
      if (genreList === "") {
        genreList = "n/a";
      }
      if (status === null) {
        status = "?";
      }
      if (synopsis === null) {
        synopsis = "Go to MyAnimeList to learn more!";
      }
      if (synopsis.length > 350) {
        synopsis = synopsis.slice(0, 350) + "...";
      }

      chapters = chapters.toString();

      const mangaEmbed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(synopsis)
        .setThumbnail(image)
        .addFields(
          { name: "English Title", value: `*${title_english}*`, inline: true },
          { name: "Genre", value: genreList, inline: true },
          { name: "Type", value: type, inline: true }
        )
        .addFields(
          { name: "Chapters", value: chapters, inline: true },
          { name: "Status", value: status, inline: true },
          { name: "", value: "", inline: true }
        )
        .setColor("Random");

      interaction.reply({ embeds: [mangaEmbed] });
    } catch (error) {
      console.log(error);
      interaction.reply(`Sorry, I couldn't find something for you...\n*pls get <@411906843825405967> if I keep breaking* 🥺👉👈`);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "horny-anime") {
    interaction.reply("*Finding the perfect anime to goon to...*\n*Please do not send another request until this one is complete*");
    try {
      let user = interaction.user.id;
      let animeName;
      let found = false;

      while (!found) {
        animeName = await jikanjs.loadRandom("anime");
        let genres = animeName.data.genres.map((g) => g.name);

        if (genres.includes("Ecchi") || genres.includes("Hentai") || genres.includes("Erotica")) {
          found = true;
        } else {
          await delay(1000);
        }
      }

      let { title, url, type, status, episodes, duration, title_english, synopsis } = animeName.data;
      let image = animeName.data.images.jpg.image_url;
      let genreList = animeName.data.genres.map((g) => g.name).join(", ");

      if (title_english === null) {
        title_english = "n/a";
      }
      if (type === null) {
        type = "n/a";
      }
      if (episodes === null) {
        episodes = "?";
      }
      if (genreList === "") {
        genreList = "n/a";
      }
      if (!duration) {
        duration = "?";
      }
      if (!status) {
        status = "?";
      }
      if (synopsis === null) {
        synopsis = "Go to MyAnimeList to learn more!";
      }
      if (synopsis.length > 350) {
        synopsis = synopsis.slice(0, 350) + "...";
      }

      episodes = episodes.toString();

      const animeEmbed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(synopsis)
        .setThumbnail(image)
        .addFields(
          { name: "English Title", value: `*${title_english}*`, inline: true },
          { name: "Genre", value: genreList, inline: true },
          { name: "Type", value: type, inline: true }
        )
        .addFields(
          { name: "Episodes", value: episodes, inline: true },
          { name: "Duration", value: duration, inline: true },
          { name: "Status", value: status, inline: true }
        )
        .setColor("Random");

      interaction.channel.send({ content: `<@${user}>`, embeds: [animeEmbed] });
    } catch (error) {
      console.log(error);
      interaction.reply(`Sorry, I couldn't find something for you...\n*pls get <@411906843825405967> if I keep breaking* 🥺👉👈`);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "horny-manga") {
    interaction.reply("*Finding the perfect manga to goon to...*\n*Please do not send another request until this one is complete*");
    try {
      let user = interaction.user.id;
      let mangaName;
      let found = false;

      while (!found) {
        mangaName = await jikanjs.loadRandom("manga");
        let genres = mangaName.data.genres.map((g) => g.name);

        if (genres.includes("Ecchi") || genres.includes("Hentai") || genres.includes("Erotica")) {
          found = true;
        } else {
          await delay(1000);
        }
      }

      let { title, url, type, status, chapters, title_english, synopsis } = mangaName.data;
      let image = mangaName.data.images.jpg.image_url;
      let genreList = mangaName.data.genres.map((g) => g.name).join(", ");

      if (title_english === null) {
        title_english = "n/a";
      }
      if (type === null) {
        type = "n/a";
      }
      if (chapters === null) {
        chapters = "?";
      }
      if (genreList === "") {
        genreList = "n/a";
      }
      if (status === null) {
        status = "?";
      }
      if (synopsis === null) {
        synopsis = "Go to MyAnimeList to learn more!";
      }
      if (synopsis.length > 350) {
        synopsis = synopsis.slice(0, 350) + "...";
      }

      chapters = chapters.toString();

      const mangaEmbed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(synopsis)
        .setThumbnail(image)
        .addFields(
          { name: "English Title", value: `*${title_english}*`, inline: true },
          { name: "Genre", value: genreList, inline: true },
          { name: "Type", value: type, inline: true }
        )
        .addFields(
          { name: "Chapters", value: chapters, inline: true },
          { name: "Status", value: status, inline: true },
          { name: "", value: "", inline: true }
        )
        .setColor("Random");

      interaction.channel.send({ content: `<@${user}>`, embeds: [mangaEmbed] });
    } catch (error) {
      console.log(error);
      interaction.reply(`Sorry, I couldn't find something for you...\n*pls get <@411906843825405967> if I keep breaking* 🥺👉👈`);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "clean-anime") {
    interaction.reply("*Finding you a clean anime...*\n*Please do not send another request until this one is complete*");

    try {
      let user = interaction.user.id;
      let animeName;
      let found = false;

      while (!found) {
        animeName = await jikanjs.loadRandom("anime");
        let genres = animeName.data.genres.map((g) => g.name);

        if (genres.includes("Ecchi") || genres.includes("Hentai") || genres.includes("Erotica")) {
          await delay(1000);
        } else {
          found = true;
        }
      }

      let { title, url, type, status, episodes, duration, title_english, synopsis } = animeName.data;
      let image = animeName.data.images.jpg.image_url;
      let genreList = animeName.data.genres.map((g) => g.name).join(", ");

      if (title_english === null) {
        title_english = "n/a";
      }
      if (type === null) {
        type = "n/a";
      }
      if (episodes === null) {
        episodes = "?";
      }
      if (genreList === "") {
        genreList = "n/a";
      }
      if (!duration) {
        duration = "?";
      }
      if (!status) {
        status = "?";
      }
      if (synopsis === null) {
        synopsis = "Go to MyAnimeList to learn more!";
      }
      if (synopsis.length > 350) {
        synopsis = synopsis.slice(0, 350) + "...";
      }

      episodes = episodes.toString();

      const animeEmbed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(synopsis)
        .setThumbnail(image)
        .addFields(
          { name: "English Title", value: `*${title_english}*`, inline: true },
          { name: "Genre", value: genreList, inline: true },
          { name: "Type", value: type, inline: true }
        )
        .addFields(
          { name: "Episodes", value: episodes, inline: true },
          { name: "Duration", value: duration, inline: true },
          { name: "Status", value: status, inline: true }
        )
        .setColor("Random");

      interaction.channel.send({ content: `<@${user}>`, embeds: [animeEmbed] });
    } catch (error) {
      console.log(error);
      interaction.reply(`Sorry, I couldn't find something for you...\n*pls get <@411906843825405967> if I keep breaking* 🥺👉👈`);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "clean-manga") {
    interaction.reply("*Finding you a clean manga...*\n*Please do not send another request until this one is complete*");

    try {
      let user = interaction.user.id;
      let mangaName;
      let found = false;

      while (!found) {
        mangaName = await jikanjs.loadRandom("manga");
        let genres = mangaName.data.genres.map((g) => g.name);

        if (genres.includes("Ecchi") || genres.includes("Hentai") || genres.includes("Erotica")) {
          await delay(1000);
        } else {
          found = true;
        }
      }

      let { title, url, type, status, chapters, title_english, synopsis } = mangaName.data;
      let image = mangaName.data.images.jpg.image_url;
      let genreList = mangaName.data.genres.map((g) => g.name).join(", ");

      if (title_english === null) {
        title_english = "n/a";
      }
      if (type === null) {
        type = "n/a";
      }
      if (chapters === null) {
        chapters = "?";
      }
      if (genreList === "") {
        genreList = "n/a";
      }
      if (status === null) {
        status = "?";
      }
      if (synopsis === null) {
        synopsis = "Go to MyAnimeList to learn more!";
      }
      if (synopsis.length > 350) {
        synopsis = synopsis.slice(0, 350) + "...";
      }

      chapters = chapters.toString();

      const mangaEmbed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(synopsis)
        .setThumbnail(image)
        .addFields(
          { name: "English Title", value: `*${title_english}*`, inline: true },
          { name: "Genre", value: genreList, inline: true },
          { name: "Type", value: type, inline: true }
        )
        .addFields(
          { name: "Chapters", value: chapters, inline: true },
          { name: "Status", value: status, inline: true },
          { name: "", value: "", inline: true }
        )
        .setColor("Random");

      interaction.channel.send({ content: `<@${user}>`, embeds: [mangaEmbed] });
    } catch (error) {
      console.log(error);
      interaction.reply(`Sorry, I couldn't find something for you...\n*pls get <@411906843825405967> if I keep breaking* 🥺👉👈`);
    }
  }
});

client.login(process.env.TOKEN);
