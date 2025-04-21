const config = require('../config');
const { cmd } = require('../command');
const { getGroupAdmins } = require('../lib/functions');

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ Only group admins or the bot owner can use this command.");
        }

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants?.length || 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['📢', '🔊', '🌐', '🔰', '🤍', '🖤', '📝', '💗', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '🎧', '⚡', '🚩', '🍁', '🗣️', '👻', '⚠️', '🔥'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        let msgText = body.slice(body.indexOf(command) + command.length).trim();
        if (!msgText) msgText = "⏳ Hello everyone! Please check the pinned message or update.";

        let teks = `
╭────[ 🧷 𝙶𝚁𝙾𝚄𝙿 𝚃𝙰𝙶𝙶𝙴𝚁 ]─────
│🏷 | Group: *${groupName}*
│👥 | Members: *${totalMembers}*
│💬 | Message: *${msgText}*
╰────────────────────

📣 *MENTIONING EVERYONE:*
`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `➤ ${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += `\n───────────────\n✨ Powered by *HANS-XMD_V3*`;

        await conn.sendMessage(from, {
            text: teks,
            mentions: participants.map(p => p.id)
        }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
