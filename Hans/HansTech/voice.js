import config from '../../config.cjs';

// Main command function
const voicechatbotcmds = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'voicechatbot') {
    if (!isCreator) return m.reply("*Only admin*");
    let responseMessage;

    if (text === 'on') {
      config.VOICE_CHATBOT = true;
      responseMessage = "voicechatbot has been enabled.";
    } else if (text === 'off') {
      config.VOICE_CHATBOT = false;
      responseMessage = "voicechatbot has been disabled.";
    } else {
      responseMessage = "Usage:\n- `voicechatbot on`: Enable voicechatbot\n- `voicechatbot off`: Disable voicechatbot";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default voicechatbotcmds;
