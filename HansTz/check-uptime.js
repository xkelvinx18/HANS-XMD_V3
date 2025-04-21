const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "uptime",
    alias: ["runtime", "up"],
    desc: "Show bot uptime with stylish formats",
    category: "main",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);

        // Stylish Formats
        const style1 = `
╭─❖「 ⏱ UPTIME STATUS 」
│ ⚡ Uptime: ${uptime}
│ 🕒 Started: ${startTime.toLocaleString()}
╰─────────────⟡
「 HANS XMD 」`;

        const style2 = `
╔═════『 RUNTIME 』 ═══╗
║ ⏰ Duration: ${uptime}
║ 🛠 Launched: ${startTime.toLocaleTimeString()}
╚═══════════════╝
🤖 HansXMD v3`;

        const style3 = `
┏━━━✦❘༻༺❘✦━━━┓
┃  ⏱ BOT STATUS
┣━━━━━━━━━━━
┃ ⏳ Uptime: ${uptime}
┃ 🕘 Since: ${startTime.toLocaleDateString()}
┗✦❘༻HansXMD༺❘✦━━┛`;

        const style4 = `
🛸 *HANS-XMD LIVE REPORT* 🛸
━━━━━━━━━━━━━━━━
⏱️ Uptime: ${uptime}
📍 Boot Time: ${startTime.toLocaleString()}
━━━━━━━━━━━━━━━`;

        const style5 = `
╭─❍ UPTIME PANEL ❍─╮
│
├─⏱ Runtime: ${uptime}
├─📅 Start: ${startTime.toDateString()}
│
╰──「 Hans-Xmd_V3 」──╯`;

        const style6 = `
📟 *[ Hans-XMD Status ]*
━━━━━━━━━━━━━━━
• Time Online: ${uptime}
• Online Since: ${startTime.toLocaleString()}
━━━━━━━━━━━━━━━`;

        const style7 = `
╓═════🕒 Hans-XMD Uptime ═════╖
║ 🧿 Uptime: ${uptime}
║ 🕯️ Started: ${startTime.toLocaleString()}
╙═════════════════════╜`;

        const style8 = `
🎯 *BOT ONLINE!*
––––––––––––––––––––
⏳ Up: ${uptime}
⏰ Booted At: ${startTime.toLocaleString()}
🎯 *Hans-Xmd is running*`;

        const style9 = `
⬛ Hans XMD Bot Tracker ⬛

▶️ Running for: ${uptime}
🕓 Started at: ${startTime.toLocaleTimeString()}

✅ Status: Online`;

        const style10 = `
╔══════ HANS XMD ══════╗
║ ⏱️ UPTIME: ${uptime}
║ 🧭 STARTED: ${startTime.toLocaleString()}
╚══════ STATUS OK ══════╝`;

        const styles = [style1, style2, style3, style4, style5, style6, style7, style8, style9, style10];
        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        // First send image with the uptime style as caption
        await conn.sendMessage(from, {
            image: { url: 'https://raw.githubusercontent.com/Mrhanstz/HansTz-Sever/refs/heads/main/Database/HansTz7.jpg' },
            caption: selectedStyle,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363352087070233@newsletter',
                    newsletterName: config.OWNER_NAME || 'HansTech',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Then send audio
        await conn.sendMessage(from, {
            audio: { url: "https://github.com/Mrhanstz/HANS-XMD_V3/raw/refs/heads/main/Hans-Tz/HansTz.mp3" },
            mimetype: "audio/mp4",
            ptt: true
        });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
