const axios = require('axios');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const geniusApiKey = process.env.GENIUS_API_KEY;

module.exports = async (client, interaction) => {
  // ... (unchanged code)

  let search = interaction.options.getString('song') || player.queue.current.title;

  let lyrics = "";

  try {
    const response = await axios.get('https://api.genius.com/search', {
      params: {
        q: search,
        access_token: geniusApiKey,
      },
    });

    const hits = response.data.response.hits;

    if (hits.length > 0) {
      const firstHit = hits[0].result;
      lyrics = firstHit.title + " by " + firstHit.primary_artist.name + "\n\n" + firstHit.url;
    } else {
      lyrics = `No lyrics found for ${search} :x:`;
    }
  } catch (error) {
    lyrics = `No lyrics found for ${search} :x:`;
  }

  const embed = new MessageEmbed()
    .setTitle(`${client.emotes.normal.music}・Lyrics For ${search}`)
    .setDescription(lyrics)
    .setColor('#0099ff');

  interaction.reply({ embeds: [embed] });
};
