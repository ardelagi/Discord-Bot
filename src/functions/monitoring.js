const os = require('os');
const { EmbedBuilder } = require('discord.js');

function getMonitoringEmbed(client) {
  const totalUsers = client.users.cache.size;
  const totalGuilds = client.guilds.cache.size;
  const memoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
  const cpuLoad = os.loadavg()[0].toFixed(2);
  const uptime = Math.floor(process.uptime());
  const ping = client.ws.ping;
  const platform = os.platform();

  function formatUptime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  }

  return new EmbedBuilder()
    .setTitle("📡 Bot Monitoring")
    .setColor("Green")
    .addFields(
      { name: "🟢 Status", value: "Online", inline: true },
      { name: "🕰️ Uptime", value: formatUptime(uptime), inline: true },
      { name: "🧠 Memory", value: `${memoryUsage} MB`, inline: true },
      { name: "🖥️ CPU Load", value: `${cpuLoad}`, inline: true },
      { name: "📶 Ping", value: `${ping}ms`, inline: true },
      { name: "🛠 Platform", value: platform, inline: true },
      { name: "🌐 Server", value: `${totalGuilds}`, inline: true },
      { name: "👥 Users", value: `${totalUsers}`, inline: true },
      { name: "❌ Error", value: "Tidak ada error", inline: false }
    )
    .setFooter({ text: `MARA STORE by ardelagil | ${new Date().toLocaleString()}` });
}

module.exports = getMonitoringEmbed;