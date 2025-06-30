require("./settings");
const {
  default: makeWaSocket,
  socket,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@whiskeysockets/baileys");
const { modul } = require("./module");
const Jimp = require('jimp')
const { downloadMediaMessage } =
  async function generateProfilePicture(buffer) {
    const jimp = await Jimp.read(buffer)
    const min = jimp.getWidth() < jimp.getHeight() ? jimp.getWidth() : jimp.getHeight()
    const cropped = jimp.crop(0, 0, min, min)
    return {
        img: await cropped.resize(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    }
}

const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

async function saveMedia(message, type = 'image') {
  const stream = await downloadContentFromMessage(message, type);
  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  return buffer;
}

const { exec } = require("child_process");
const { os, axios, baileys, chalk, cheerio, FileType, fs, PhoneNumber, process, moment, ms, util, ytdl,  } = modul;
const { color, bgcolor } = require("./lib/color");
const { delay } = require("@whiskeysockets/baileys");
const FormData = require('form-data');
const readFile = util.promisify(fs.readFile);
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const path = require("path");

module.exports = conn = async (conn, m, chatUpdate, store) => {
try {
  async function appenTextMessage(text, chatUpdate) {
    let messages = await generateWAMessage(
      m.chat,
      {
        text: text,
        mentions: m.mentionedJid,
      },
      {
        userJid: conn.user.id,
        quoted: m.quoted && m.quoted.fakeObj,
      },
    );
    messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    if (m.isGroup) messages.participant = m.sender;
    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: "append",
    };
    conn.ev.emit("messages.upsert", msg);
  }
    const { type, quotedMsg, mentioned, now, fromMe } = m;
  let body =
    m.mtype === "interactiveResponseMessage"
      ? JSON.parse(
          m.message.interactiveResponseMessage.nativeFlowResponseMessage
            .paramsJson,
        ).id
      : m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
          ? m.message.imageMessage.caption
          : m.mtype == "videoMessage"
            ? m.message.videoMessage.caption
            : m.mtype == "extendedTextMessage"
              ? m.message.extendedTextMessage.text
              : m.mtype == "buttonsResponseMessage"
                ? m.message.buttonsResponseMessage.selectedButtonId
                : m.mtype == "listResponseMessage"
                  ? m.message.listResponseMessage.singleSelectReply
                      .selectedRowId
                  : m.mtype == "templateButtonReplyMessage"
                    ? m.message.templateButtonReplyMessage.selectedId
                    : m.mtype == "messageContextInfo"
                      ? m.message.buttonsResponseMessage?.selectedButtonId ||
                        m.message.listResponseMessage?.singleSelectReply
                          .selectedRowId ||
                        m.text
                      : m.mtype === "editedMessage"
                        ? m.message.editedMessage.message.protocolMessage
                            .editedMessage.extendedTextMessage
                          ? m.message.editedMessage.message.protocolMessage
                              .editedMessage.extendedTextMessage.text
                          : m.message.editedMessage.message.protocolMessage
                              .editedMessage.conversation
                        : "";


// ───────────────────────────────────────────────────────────────────────────────乂 🥀 SETTINGS AllFILE ───────────────────────────────────────────────────────────────乂 \\                                                
const {
  clockString,
  parseMention,
  formatp,
  isUrl,
  sleep,
  runtime,
  getBuffer,
  jsonformat,
  format,
  capital,
  reSize,
} = require("./lib/myfunc");

const premium = JSON.parse(fs.readFileSync("./database/premium.json"))

// ───────────────────────────────────────────────────────────────────────────────乂 🥀 SETTINGS ADMIN - BOT - OWNER ───────────────────────────────────────────────────────────────乂 \\                                                
const budy = (typeof m.text == 'string' ? m.text : '.')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
  const chath = body;
  const pes = body;
  const messagesC = pes.slice(0).trim();
  const content = JSON.stringify(m.message);
  const isCmd = body.startsWith(prefix);
  const from = m.key.remoteJid;
  const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase();
  const command = body
    .replace(prefix, "")
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();
  const args = body.trim().split(/ +/).slice(1);
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = m.sender === global.ownernumber.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const pushname = m.pushName || "Nothing";
  const text = (q = args.join(" "));
  const isGrupReseller = premium.includes(m.chat)
  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || "";
  const qmsg = quoted.msg || quoted;
  const isMedia = /image|video|sticker|audio/.test(mime);
  const isImage = type == "imageMessage";
  const isVideo = type == "videoMessage";
  const isAudio = type == "audioMessage";
  const isSticker = type == "stickerMessage";
  const isQuotedImage =
    type === "extendedTextMessage" && content.includes("imageMessage");
  const isQuotedLocation =
    type === "extendedTextMessage" && content.includes("locationMessage");
  const isQuotedVideo =
    type === "extendedTextMessage" && content.includes("videoMessage");
  const isQuotedSticker =
    type === "extendedTextMessage" && content.includes("stickerMessage");
  const isQuotedAudio =
    type === "extendedTextMessage" && content.includes("audioMessage");
  const isQuotedContact =
    type === "extendedTextMessage" && content.includes("contactMessage");
  const isQuotedDocument =
    type === "extendedTextMessage" && content.includes("documentMessage");
  const sender = m.isGroup
    ? m.key.participant
      ? m.key.participant
      : m.participant
    : m.key.remoteJid;
  const senderNumber = sender.split("@")[0];
  const groupMetadata = m.isGroup
    ? await conn.groupMetadata(m.chat).catch((e) => {})
    : "";
  const participants =
    m.isGroup && groupMetadata ? groupMetadata.participants : [];
  const groupAdmins = m.isGroup
    ? await participants.filter((v) => v.admin !== null).map((v) => v.id)
    : [];
  const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : [];
  const groupOwner = m.isGroup && groupMetadata ? groupMetadata.owner : [];
  const groupMembership =
    m.isGroup && groupMetadata ? groupMetadata.membership : [];
  const groupMembers =
    m.isGroup && groupMetadata ? groupMetadata.participants : [];
  const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
  const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
  const isPremium = premium.includes(m.sender)
  const mentionUser = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];
  const mentionByTag =
    type == "extendedTextMessage" &&
    m.message.extendedTextMessage.contextInfo != null
      ? m.message.extendedTextMessage.contextInfo.mentionedJid
      : [];
  const mentionByReply =
    type == "extendedTextMessage" &&
    m.message.extendedTextMessage.contextInfo != null
      ? m.message.extendedTextMessage.contextInfo.participant || ""
      : "";
  const numberQuery =
    q.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net";
  const usernya = mentionByReply ? mentionByReply : mentionByTag[0];
  const Input = mentionByTag[0]
    ? mentionByTag[0]
    : mentionByReply
      ? mentionByReply
      : q
        ? numberQuery
        : false;


// ───────────────────────────────────────────────────────────────────────────────乂 🥀 SETTINGS TIME ───────────────────────────────────────────────────────────────乂 \\                        
  const xtime = moment.tz("Asia/Jakarta").format("HH:mm:ss");
  const xdate = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");
  const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
  if (time2 < "23:59:00") {
    var timewisher = `Selamat Malam`;
  }
  if (time2 < "19:00:00") {
    var timewisher = `Selamat Malam`;
  }
  if (time2 < "18:00:00") {
    var timewisher = `Selamat Sore`;
  }
  if (time2 < "15:00:00") {
    var timewisher = `Selamat Siang`;
  }
  if (time2 < "11:00:00") {
    var timewisher = `Selamat Pagi`;
  }
  if (time2 < "05:00:00") {
    var timewisher = `Selamat Pagi`;
  }
  // Waktu sekarang di zona Asia/Jakarta
  let sekarang = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
  );
  // Fungsi tanggal, bulan, tahun
  function tanggal(ms) {
    return new Date(ms).getDate().toString().padStart(2, "0");
  }
  function bulan(ms) {
    return (new Date(ms).getMonth() + 1).toString().padStart(2, "0"); // +1 karena Januari = 0
  }
  function tahun(ms) {
    return new Date(ms).getFullYear();
  }
  // Fungsi jam:menit:detik
  function formatJam(date) {
    let jam = date.getHours().toString().padStart(2, "0");
    let menit = date.getMinutes().toString().padStart(2, "0");
    let detik = date.getSeconds().toString().padStart(2, "0");
    return `${jam}:${menit}:${detik}`;
  }
  // Output akhir
  let futureDescription = `
📅 *Update Kurs:* ${tanggal(sekarang.getTime())}/${bulan(sekarang.getTime())}/${tahun(sekarang.getTime())}
🕰 *Waktu Jakarta (WIB):* ${formatJam(sekarang)}`;


// ───────────────────────────────────────────────────────────────────────────────乂 🥀 SETTINGS QUOTED ───────────────────────────────────────────────────────────────乂 \\
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${prefix+command}`}}}
const qbug = {key: {remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net'}, message: {listResponseMessage: {title: `ꪎ ${global.ownername}`
}}}

const qdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}

const qloc = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}

const qloc2 = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}

const qpayment = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "USD", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Simple Bot"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "USD"}}}}

const qtoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast"} : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": ""}, "title": `ꪎ ${global.ownername}`, "description": null, "currencyCode": "IDR", "priceAmount1000": "999999999999999", "retailerId": `ꪎ ${global.ownername}`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}

const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}

async function reply(txt) {
const Akame = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: `—— HanzXZy - Botz ——`,
newsletterJid: `${global.idSaluran}`,
},
externalAdReply: {  
showAdAttribution: true,
title: `⟨— HanzXZy-Botz —⟩`,
body: 'Powered by HanzXZy',
thumbnailUrl: `${global.thumbreply}`,
sourceUrl: global.website,
},
},
text: txt,
}
return conn.sendMessage(m.chat, Akame, {
quoted: m,
})
}

const reply2 = (teks) => {
conn.sendMessage(from, { text : teks }, { quoted : m })
}

const example = (teks) => {
return `\n *❌ Command not Found*
╔════════════════════════════╗
║ *Contoh :* ${prefix+command} ${teks}        
╚════════════════════════════╝`
}

async function daftar(txt) {
const daftar = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: `—— HanzXZy - Botz ——`,
newsletterJid: `${global.idSaluran}`,
},
externalAdReply: {  
title: `—— Registrasi User ——`,
body: '',
thumbnailUrl: `${global.thumbreply}`,
mediaType: 1,
renderLargerThumbnail: true,
},
},
text: txt,
}
return conn.sendMessage(m.chat, daftar, {
quoted: m,
})
}

// ───────────────────────────────────────────────────────────────────────────────乂 🥀 SETTINGS PUBLICK - CONSOLE MESSAGE ───────────────────────────────────────────────────────────────乂 \\
if (!conn.public && !m.key.fromMe && !global.ownernumber.includes(m.sender.split("@")[0])) {
  return;
}

if (m.message) {
    const time = chalk.yellow(moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss'))
    const msgType = chalk.cyan(budy ? budy : m.mtype)
    const sender = `${chalk.green(pushname)} ${chalk.gray(`<${m.sender}>`)}`
    const location = m.isGroup
        ? `${chalk.blue('Group:')} ${chalk.yellow(groupName)} ${chalk.gray(`(${m.chat})`)}`
        : chalk.blue('Private Chat')
    console.log(
`${chalk.white('┌' + '─'.repeat(15) + '[ NEW MESSAGE ]' + '─'.repeat(16) + '┐')}
📅 ↳ ${time}
💬 ↳ ${msgType}
🙋 ↳ ${sender}
📍 ↳ ${location}
${chalk.white('└' + '─'.repeat(50) + '┘')}`
    )
}


// ───────────────────────────────────────────────────────────────────────────────乂 🥀 ALL FUNCTION ───────────────────────────────────────────────────────────────乂 \\                        
  async function sendconnMessage(chatId, message, options = {}) {
    let generate = await generateWAMessage(chatId, message, options);
    let type2 = getContentType(generate.message);
    if ("contextInfo" in options)
      generate.message[type2].contextInfo = options?.contextInfo;
    if ("contextInfo" in message)
      generate.message[type2].contextInfo = message?.contextInfo;
    return await conn.relayMessage(chatId, generate.message, {
      messageId: generate.key.id,
    });
  }
  
  function GetType(Data) {
    return new Promise((resolve, reject) => {
      let Result, Status;
      if (Buffer.isBuffer(Data)) {
        Result = new Buffer.from(Data).toString("base64");
        Status = 0;
      } else {
        Status = 1;
      }
      resolve({
        status: Status,
        result: Result,
      });
    });
  }
  
  function randomId() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  
  function monospace(string) {
    return '```' + string + '```'
}

function monospa(string) {
    return '`' + string + '`'
}

function getRandomFile(ext) {
return `${Math.floor(Math.random() * 10000)}${ext}`;
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

function randomNomor(min, max = null){
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}

function generateRandomPassword() {
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
const length = 10;
let password = '';
for (let i = 0; i < length; i++) {
const randomIndex = Math.floor(Math.random() * characters.length);
password += characters[randomIndex];
}
return password;
}

function generateRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ───────────────────────────────────────────────────────────────────────────────乂 🥀 PLUGINS ───────────────────────────────────────────────────────────────乂 \\                        
    const pluginsLoader = async (directory) => {
      let plugins = [];
      const folders = fs.readdirSync(directory);
      folders.forEach((file) => {
        const filePath = path.join(directory, file);
        if (filePath.endsWith(".js")) {
          try {
            const resolvedPath = require.resolve(filePath);
            if (require.cache[resolvedPath]) {
              delete require.cache[resolvedPath];
            }
            const plugin = require(filePath);
            plugins.push(plugin);
          } catch (error) {
            console.log(`Error loading plugin at ${filePath}:`, error);
          }
        }
      });
      return plugins;
    };

    let pluginsDisable = true;
    const plugins = await pluginsLoader(path.resolve(__dirname, "plugins"));
    const kyykzy = { conn, prefix, command, reply, text, isGroup: m.isGroup, isCreator, example, sender, senderNumber, pushname, args, runtime, formatp, sleep, getBuffer, isBotAdmins, isAdmins, isCmd, qtext, isPremium, randomNomor, monospace, pickRandom, getRandomFile };
    for (let plugin of plugins) {
      if (plugin.command.find((e) => e == command.toLowerCase())) {
        pluginsDisable = false;
        if (typeof plugin !== "function") return;
        await plugin(m, kyykzy);
      }
    }
    if (!pluginsDisable) return;
  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
  switch (command) {
case 'menu': {
let menu = ` 
 Hi @${sender.split("@")[0]}🪸
 
 ╭───〔 Bot Information 〕───
 │ ⃞ Creator : HanzXZy
 │ ⃞ Bot Name : HanzXZy-Botz
 │ ⃞ Prefix : [ ${prefix} ]
 │ ⃞ Status : ${conn.public ? "🌐 Public" : "🍃 Self"}
 │ ⃞ Type : Case X Plugin cjs 
 │ ⃞ Version : 0.0.1 (beta)
 │ ⃞ Baileys : ${global.baileys}
 │ ⃞ Owner : @6287883319040
 ╰─────────────────
  ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
╭───〔 *🔧 Tools* 〕──────
│ • .bot
│ • .spam
│ • .tourl
│ • .npm
╰─────────────────
╭───〔 *👑 Owner* 〕──────
│ • .addcase
│ • .addplug
│ • .self
│ • .public
╰─────────────────
╭───〔 *🖥️ Panel Pterodactyl* 〕──────
│ • .1gb username,628xxxxxx
│ • .2gb username,628xxxxxx
│ • .3gb username,628xxxxxx
│ • .4gb username,628xxxxxx 
│ • .5gb username,628xxxxxx
│ • .6gb username,628xxxxxx
│ • .7gb username,628xxxxxx
│ • .8gb username,628xxxxxx
│ • .9gb username,628xxxxxx
│ • .10gb username,628xxxxxx
│ • .unli username,628xxxxxx
╰─────────────────
╭───〔 *⚙️ Settings Panel* 〕──────
│ • .addakses
│ • .delakses
│ • .listakses
╰─────────────────
╭───〔 *📥 Download* 〕──────
│ • .toaudio-yt
│ • .tiktok
╰─────────────────
╭───〔 *📌 Group* 〕──────
│ • .group open
│ • .group close
│ • .leave
╰─────────────────
╭───〔 *🎮 Game* 〕──────
│ • .susunkata (beta)
╰─────────────────
╭───〔 *🛒 Store* 〕──────
│ • .proses
│ • .done
╰─────────────────`

   conn.sendMessage(m.chat, {
        document: fs.readFileSync('./package.json'),
        fileName: 'HanzXZy-Bot',
        mimetype: 'application/json',
        jpegThumbnail: fs.readFileSync('./media/HanzXZy.jpg'),
        caption: menu,
        footer: `${global.fother}`,
        headerType: 1,
        viewOnce: false,
        buttons: [
            {
                buttonId: `.owner`,
                buttonText: { displayText: 'Developer' },
                type: 1
            }
        ],
        contextInfo: {
            isForwarded: true,
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
                newsletterJid: `${global.idSaluran}`,
                newsletterName: `—— HanzXZy-Botz ——`,
            },
            externalAdReply: {
                title: 'HanzXZy-Botz - Menu',
                body: 'Powered by HanzXZy',
                thumbnailUrl: `${global.thumbreply}`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: qlive });
    
    break;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     case 'addcase': {
    if (!isCreator) return reply(mess.creator)

    // Validasi input
    if (!text) return reply(`*Silakan tambahkan fitur case!*\n*Contoh* : ${prefix+command} case "cmd": {\n_code lainnya......_`)

    const fs = require('fs')
    const namaFile = 'case.js'
    const caseBaru = `${text}`

    // Baca file JS
    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan saat membaca file:', err)
            return reply('Gagal membaca file.')
        }

        // Cari posisi awal case 'addcase'
        const posisiAwalGimage = data.indexOf("case 'addcase':")

        if (posisiAwalGimage !== -1) {
            const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage)
            fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
                if (err) {
                    console.error('Terjadi kesalahan saat menulis file:', err)
                    return reply('Gagal menulis ke file.')
                } else {
                    reply('*✅ Succes Add Case To case.js*')
                }
            })
        } else {
            reply('❌ Tidak dapat menemukan posisi penambahan case.')
        }
    })
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case 'group': {
    if (!m.isGroup) return reply(mess.group)
    if (!isBotAdmins) return reply(mess.botAdmin)
    if (!isAdmins && !isCreator) return reply(mess.admin)

    if (!args[0]) {
        return reply(`📌 *Gunakan format:*
• *.group open* – membuka grup (semua member bisa chat)
• *.group close* – menutup grup (hanya admin bisa chat)`)
    }

    const mode = args[0].toLowerCase()
    const metadata = await conn.groupMetadata(m.chat)
    const groupName = metadata.subject
    const memberCount = metadata.participants.length
    const adminCount = metadata.participants.filter(p => p.admin !== null).length
    const timeNow = new Date().toLocaleString('id-ID')

    if (mode === 'open') {
        await conn.groupSettingUpdate(m.chat, 'not_announcement')
        reply(
`╭─❖ *🍃 Group Telah Dibuka 🍃*
│
├─ 🎉 *PENGUMUMAN:*
├─ ✨ Semua member sekarang bisa chat
├─ 💬 Diskusi bebas telah dimulai
├─ 🚀 Mari berbagi & berinteraksi!
│
├─ 📝 *Aturan tetap berlaku:*
├─ • Hormati sesama member
├─ • No spam & toxic
├─ • Stay positive vibes ✨
│
╰─❖ *Selamat berdiskusi semuanya!* 🎊`
        )
    } else if (mode === 'close') {
        await conn.groupSettingUpdate(m.chat, 'announcement')
        reply(
`╭─❖ *🔒 Group Telah Ditututp 🔒*
│
├─ 🚫 *PENGUMUMAN:*
├─ ✋ Grup hanya bisa dikirim pesan oleh admin
├─ 📵 Sesi diskusi sedang dihentikan sementara
├─ 🔧 Gunakan waktu ini untuk istirahat atau evaluasi
│
├─ 📌 *Catatan:*
├─ • Tidak ada pesan dari non-admin
├─ • Harap tunggu informasi selanjutnya
│
╰─❖ *Terima kasih atas pengertiannya!* 🙏`
        )
    } else {
        reply(`❗ *Opsi tidak dikenal:*\n"${mode}"\n\nGunakan *.group open* atau *.group close*.`)
    }
}
break;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case 'addplug': {
    if (!isCreator) return reply(mess.creator)
    if (!text) return reply('Masukkan nama file. Contoh: .addplug myplugin')

    if (!q) return reply('Kirimkan isi plugin sebagai reply text.')

    const fs = require('fs')
    const path = require('path')
    const fileName = `${text}.js`
    const filePath = path.join(__dirname, 'plugins', fileName)

    if (fs.existsSync(filePath)) return reply('*⚠️ Allready file name!*')

    let quotedText = m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!quotedText) return reply('*Reply plugins code!*')

    fs.writeFileSync(filePath, quotedText)
    reply(`✅ Plugin *${fileName}* berhasil ditambahkan ke folder /.plugins`)
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case 'setppbot2': {
    if (!isCreator) return reply(mess.creator)
    if (!m.quoted) return reply(`Reply foto dgn caption ${prefix + command}`)

    let mime = m.quoted.mimetype || ''
    if (!/image/.test(mime)) return reply('Reply gambar, bukan yang lain!')
    if (/webp/.test(mime)) return reply('Sticker tidak bisa dijadikan foto profil!')

    try {
        // Pakai download() langsung
        let media = await m.quoted.download()
        let { img } = await generateProfilePicture(media)

        await conn.query({
            tag: 'iq',
            attrs: {
                to: botNumber,
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: { type: 'image' },
                content: img
            }]
        })

        m.reply('✅ Foto profil bot berhasil diubah!')
    } catch (err) {
        console.error('❌ ERROR:', err)
        m.reply('❌ Gagal mengambil gambar. Pastikan gambar direply dengan benar.')
    }
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

case 'tourl': {
  const mime = (quoted.msg || quoted).mimetype || '';
  if (!/image|video|audio|webp/.test(mime)) return reply(example('📎 *Silakan kirim atau reply media untuk to URL!*'));

  const fs = require('fs');
  const axios = require('axios');
  const FormData = require('form-data');

  const CatBox = async (path) => {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('userhash', '');
    form.append('fileToUpload', fs.createReadStream(path));

    const config = {
      method: 'POST',
      url: 'https://catbox.moe/user/api.php',
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
      },
      data: form,
    };

    const res = await axios.request(config);
    return res.data;
  };

  const media = await conn.downloadAndSaveMediaMessage(quoted);
  if (!media || !fs.existsSync(media)) {
    return m.reply('❌ Gagal mengambil media, pastikan media valid!');
  }

  try {
    const catBoxUrl = await CatBox(media);
    console.log('✅ CatBox response:', catBoxUrl);

    if (!catBoxUrl || !/^https?:\/\//.test(catBoxUrl)) {
      throw '⚠️ *Gagal mendapatkan data URL dari CatBox!*';
    }

    const teks = `🌟 *Berhasil Mengunggah Media To URL!* 📎\nMedia By : @${sender.split("@")[0]}\n> get link tourl in here`;

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            contextInfo: { mentionedJid: [m.sender] },
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: teks }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '📥 Lihat Media',
                    url: catBoxUrl,
                    merchant_url: catBoxUrl,
                  }),
                },
                {
                  name: 'cta_copy',
                  buttonParamsJson: JSON.stringify({
                    display_text: '📎 Copy URL',
                    copy_code: catBoxUrl,
                  }),
                },
              ],
            }),
          }),
        },
      },
    }, { userJid: m.chat, quoted: qlive });

    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

    if (fs.existsSync(media)) fs.unlinkSync(media); // hapus file lokal
  } catch (err) {
    console.error('Tourl error:', err);
    m.reply('❌ *Gagal Mengunggah Media To URL!*');
  }

  break;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   case 'toaudio-yt': {
 if (!text) return m.reply("*Contoh* : .toaudio-yt https://youtube.com/watch?v=dQw4w9WgXcQ")
 
  try {
    let res = await axios.get(`http://api.ditss.cloud/download/ytmp3?url=${encodeURIComponent(text)}`);
    let result = res.data;

    if (!result.status) return m.reply(result.message || 'Gagal mengambil data');

    let teks = `🎵 *YouTube To Audio*\n\n`;
    teks += `📌 *Judul:* ${result.result.title}\n`;
    teks += `🔗 *Link:* ${result.result.link}\n`;
    teks += `📥 *Source:* ${result.result.source}\n`;
    teks += `🕒 *Waktu:* ${result.result.time}`;

    await conn.sendMessage(m.chat, {
      audio: { url: result.result.link },
      mimetype: 'audio/mpeg',
      fileName: `${result.result.title}.mp3`,
      ptt: false
    }, { quoted: qlive });

    await m.reply(teks);
    
  } catch (e) {
    console.error(e);
    m.reply('❌ Terjadi kesalahan. Coba lagi nanti.');
  }
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  case "proses": {
if (!isCreator) return m.reply(mess.creator)
if (!q) return m.reply(example("panel unli"))
let teks = `📦 ${text}

*Testimoni :*
${linkSaluran}

_Terimakasih telah order *${text}* Di HanzXZy, semoga langganan terus ya kak 🙏🏻_`
await conn.sendMessage(m.chat, {text: teks, mentions: [m.sender], contextInfo: {
externalAdReply: {
title: `Saldo Masuk ✅`, 
body: `© HanzXZy-Botz`, 
thumbnail: fs.readFileSync("./media/proses.jpg"),
sourceUrl: linkSaluran,
}}}, {quoted: null})
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case 'self':
case 'public': {
  if (!isCreator) return reply(mess.creator)
  if (command === 'self') {
    if (global.selfmode) return reply(`*✨ Allready Self!*`)
    global.selfmode = true
    reply(`*🛑 Information status bot 🛑*\n\n*🔧 Status bot :* \`🔒 Self | Owner only\``)
  } else {
    if (!global.selfmode) return reply('*✨ Allready public*')
    global.selfmode = false
    reply(`*🛑 Information status bot 🛑*\n\n*🔧 Status bot :* \`🌐 Public | Akses publik\``)
  }
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case "done": {
if (!isCreator) return m.reply(mess.creator)
if (!q) return m.reply(example("panel unli"))
let teks = `📦 ${text}

*Testimoni :*
${linkSaluran}

_Terimakasih telah order *${text}* Di HanzXZy, semoga langganan terus ya kak 🙏🏻_`
await conn.sendMessage(m.chat, {text: teks, mentions: [m.sender], contextInfo: {
externalAdReply: {
title: `Transaksi Done ✅`, 
body: `© HanzXZy-Botz`, 
thumbnail: fs.readFileSync("./media/done.jpg"),
sourceUrl: linkSaluran,
}}}, {quoted: null})
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
addcase case 'npm':
            case 'npms':
            case 'npmjs':
            case 'npmshare':
            case 'npmsearch': {
                if (!text) return reply(example('masukan nama package.'));
                //await load(mess.wait);

                let res = await fetch(`https://api.ditss.cloud/search/npm?apikey=DitssGanteng&q=${encodeURIComponent(text)}`);
                let json = await res.json();

                if (!json.result || !json.result.length) return m.reply('❌ *NPM tidak ditemukan.*');

                async function createImage(url) {
                    const {
                        imageMessage
                    } = await generateWAMessageContent({
                        image: {
                            url
                        }
                    }, {
                        upload: conn.waUploadToServer
                    });
                    return imageMessage;
                }

                let cards = [];
                let data = json.result.slice(0, 10); // maksimal 10 paket

                for (let pkg of data) {
                    let npmLink = pkg.links?.npm || '';
                    let github = pkg.links?.repository?.replace(/^git\+/, '').replace(/\.git$/, '');
                    let img = 'https://raw.githubusercontent.com/ditss-dev/database/main/mbnojzwp.jpg'; // ikon NPM

                    cards.push({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `📦 ${pkg.title}\n📅 Update: ${pkg.update}\n👤 ${pkg.author}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.fromObject({
                            text: 'NPM SEARCH'
                        }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            title: pkg.title,
                            hasMediaAttachment: true,
                            imageMessage: await createImage(img)
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                            buttons: [{
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📄 NPM",
                                        url: npmLink,
                                        merchant_url: npmLink
                                    })
                                },
                                github ? {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "⚙️ GitHub",
                                        url: github,
                                        merchant_url: github
                                    })
                                } : null
                            ].filter(Boolean)
                        })
                    });
                }

                const msg = generateWAMessageFromContent(m.chat, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                body: proto.Message.InteractiveMessage.Body.create({
                                    text: `🔍 *Hasil Pencarian NPM* : *\`${text}\`*\nRequest By : @${sender.split("@")[0]}`
                                }),
                                footer: proto.Message.InteractiveMessage.Footer.create({
                                    text: `${global.fother}`
                                }),
                                header: proto.Message.InteractiveMessage.Header.create({
                                    hasMediaAttachment: false
                                }),
                                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                    cards
                                })
                            })
                        }
                    }
                }, {});

                await conn.relayMessage(m.chat, msg.message, {
                    messageId: msg.key.id
                });
            }
            break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case 'tt': {
    if (!text) return m.reply(`Contoh:\n${prefix + command} https://vt.tiktok.com/ZSBefoMKe/`);
    try {
        let res = await fetch(`https://api.nekorinn.my.id/downloader/tikwm?url=${encodeURIComponent(text)}`);
        let data = await res.json();

        if (data.statusCode !== 200 || !data.result?.videoUrl) {
            return m.reply('❌ Gagal mengambil video dari TikTok.');
        }

        let { title, videoUrl, cover, create_at, stats, author, music_info } = data.result;

        let caption = `*🎬 Tiktok Downloaer Video 🌟*\n\n` +
                      `📌 *Judul:* ${title}\n` +
                      `👤 *User:* ${author.name} (${author.username})\n` +
                      `🎼 *Sound:* ${music_info.title}\n` +
                      `📊 *Statistik:*\n` +
                      `   • 👁 ${stats.play}\n` +
                      `🕒 *Diunggah:* ${create_at}`;

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: caption,
            mimetype: 'video/mp4'
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply('🚫 Terjadi kesalahan saat mengambil data.');
    }
}
break;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": 
case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": 
case "unli": case "unlimited": {
    if (!isCreator && !isGrupReseller) {
        return m.reply(`*⚠️ Create Panel Khusus Khusus Reseller And Owner Only!*\n*Hubungi Owner :*\n@${global.owner}`);
    }

    if (!text) return reply(example("username,628xxxx"));

    // Ambil data user dan nomor dari input
    let [usernameInput, numberInput] = text.split(",").map(t => t.trim());
    if (!usernameInput || !numberInput) return example("username,628XXXX");

    let username = usernameInput.toLowerCase();
    let nomor = numberInput.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    // Cek nomor terdaftar di WhatsApp
    try {
        const onWa = await conn.onWhatsApp(nomor.split("@")[0]);
        if (!onWa.length) return m.reply("Nomor tidak terdaftar di WhatsApp!");
    } catch (err) {
        return m.reply("Gagal cek nomor WhatsApp: " + err.message);
    }

    // Resource map
    const resourceMap = {
        "1gb": { ram: "1000", disk: "1000", cpu: "40" },
        "2gb": { ram: "2000", disk: "1000", cpu: "60" },
        "3gb": { ram: "3000", disk: "2000", cpu: "80" },
        "4gb": { ram: "4000", disk: "2000", cpu: "100" },
        "5gb": { ram: "5000", disk: "3000", cpu: "120" },
        "6gb": { ram: "6000", disk: "3000", cpu: "140" },
        "7gb": { ram: "7000", disk: "4000", cpu: "160" },
        "8gb": { ram: "8000", disk: "4000", cpu: "180" },
        "9gb": { ram: "9000", disk: "5000", cpu: "200" },
        "10gb": { ram: "10000", disk: "5000", cpu: "220" },
        "unli": { ram: "0", disk: "0", cpu: "0" },
        "unlimited": { ram: "0", disk: "0", cpu: "0" }
    };

const { ram, disk, cpu } = resourceMap[command];

// Object func berisi method capital
const func = {
  capital: function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
};

// Setup user data
const email = `${username}@gmail.com`;
const name = func.capital(username) + " Server";
const password = username + "404";

    // Buat user
    const userRes = await fetch(`${domain}/api/application/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`
        },
        body: JSON.stringify({ email, username, first_name: name, last_name: "Server", language: "en", password })
    });
    const userData = await userRes.json();
    if (userData.errors) return m.reply("Error: " + JSON.stringify(userData.errors[0], null, 2));
    const user = userData.attributes;

    // Ambil data startup
    const eggRes = await fetch(`${domain}/api/application/nests/${nestid}/eggs/${egg}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`
        }
    });
    const eggData = await eggRes.json();
    const startup_cmd = eggData.attributes.startup;

    // Buat server
    const serverRes = await fetch(`${domain}/api/application/servers`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`
        },
        body: JSON.stringify({
            name,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
            startup: startup_cmd,
            environment: {
                INST: "npm",
                USER_UPLOAD: "0",
                AUTO_UPDATE: "0",
                CMD_RUN: "npm start"
            },
            limits: { memory: ram, swap: 0, disk, io: 500, cpu },
            feature_limits: { databases: 5, backups: 5, allocations: 5 },
            deploy: { locations: [parseInt(loc)], dedicated_ip: false, port_range: [] },
        })
    });
    const serverData = await serverRes.json();
    if (serverData.errors) return m.reply("Error: " + JSON.stringify(serverData.errors[0], null, 2));

    const server = serverData.attributes;

    // Notifikasi berhasil
    await m.reply(`Berhasil membuat akun panel ✅\nData akun sudah dikirim ke ${nomor.split("@")[0]}`);

    // Kirim pesan detail akun via WA
    const teks = `*Berikut Detail Akun Panel Kamu 📦*\n` +
`╭──────「  *📁Data Server Panel* 」──────\n` +
`│• *📡 ID Server:* ${server.id}\n` +
`│• *👤 Username Server : ${user.username}*\n` +
`│• *🔋 Ram:* ${ram == "0" ? "Unlimited" : ram / 1000 + "GB"}\n` +
`│• *📀 Disk:* ${disk == "0" ? "Unlimited" : disk / 1000 + "GB"}\n` +
`│• *🖥️ CPU:* ${cpu == "0" ? "Unlimited" : cpu + "%"}\n` +
`╰───────────────────────\n` +
`*─── Rules Pembelian Panel ⚠️ ────*\n` +
`- Masa aktif 1 bulan\n` +
`- Garansi 15 hari (1x replace)\n` +
`- Simpan data ini baik-baik\n` +
`- Claim garansi wajib sertakan bukti pembelian`;

    const msgii = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: { showAdAttribution: true }
                    },
                    body: { text: teks },
                    footer: { text: `${global.fother}` },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🌐 Login Panel",
                                    url: global.domain,
                                    merchant_url: "https://www.google.com"
                                })
                            },
                            {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "👤 Username",
                                    id: "usr_btn",
                                    copy_code: user.username
                                })
                            },
                            {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🔑 Password",
                                    id: "pwd_btn",
                                    copy_code: password
                                })
                            }
                        ]
                    }
                })
            }
        }
    }, { userJid: m.sender, quoted: qpanel });

    await conn.relayMessage(nomor, msgii.message, { messageId: msgii.key.id });

    global.tempuser = null;
    global.temppw = null;

    break;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case "listpanel": case "listp": case "listserver": {
if (!isCreator && !isGrupReseller) return m.reply(`❌ *Fitur tidak tersedia untuk anda!*`)
let f = await fetch(domain + "/api/application/servers", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
if (servers.length < 1) return m.reply("❌ Tidak ada server panel!*")
let messageText = ""
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
messageText += `\n\n*📡 Server panel* :\n*Server name : ${s.name}*\n*• ID panel : ${s.id}*
 *• Ram :* ${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}
 *• CPU :* ${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}
 *• Disk :* ${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}
 *• Created Date :* ${s.created_at.split("T")[0]}\n`
}
await conn.sendMessage(m.chat, {text: messageText}, {quoted: m})
}
break
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case "addakses": case "addaksesgc": {
if (!isCreator) return m.reply(mess.creator)
if (!m.isGroup) return m.reply(mess.group)
const input = m.chat
if (premium.includes(input)) return m.reply(`*Grup ini sudah di beri akses reseller panel!*`)
premium.push(input)
await fs.writeFileSync("./database/premiumgc.json", JSON.stringify(premium, null, 2))
m.reply(`Berhasil menambah grup reseller panel ✅`)
}
break
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case "delakses": case "delaksesgc": {
if (!isCreator) return m.reply(mess.creator)
if (premium.length < 1) return m.reply("❌ Group Tidak Akses Reseller!*")
if (!m.isGroup) return m.reply(mess.group)
let input = text ? text : m.chat
if (input == "all") {
premium.length = 0
await fs.writeFileSync("./database/premiumgc.json", JSON.stringify(premium, null, 2))
return m.reply(`*✨ Succes Delete Akses Reseller All Group! ✅*`)
}
if (!premium.includes(input)) return m.reply(`*Group Tidak Ada Di Databse Akses Groip!*`)
let posi = premium.indexOf(input)
await premium.splice(posi, 1)
await fs.writeFileSync("./data/premium.json", JSON.stringify(premium, null, 2))
m.reply(`✨ Succes Delete Akses Reseller Group! ✅`)
}
break
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
case "listakses": {
if (!isCreator) return m.reply(mess.creator)
if (premium.length < 1) return m.reply("*❌ Tidak ada list addakses group!*")
const datagc = await conn.groupFetchAllParticipating()
let teks = ""
for (let i of premium) {
let nama = datagc[i].subject || "Grup tidak ditemukan"
teks += `*🗒️ List Addakses Group :*\n${i}
* ${nama}\n`
}
return m.reply(teks)
}
break
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  case 'spam': {
    if (!isCreator) return reply(mess.creator)

    if (!text) return reply(example("Woy @tag|5"))

    let [pesanRaw, jumlahRaw] = text.split('|')
    if (!pesanRaw || !jumlahRaw) return m.reply(`Format salah!\nContoh: ${prefix + command} halo @tag|5`)

    let jumlah = parseInt(jumlahRaw.trim())
    if (isNaN(jumlah) || jumlah < 1) return m.reply('Jumlah harus berupa angka dan lebih dari 0!')
    if (jumlah > 50) return m.reply('❌ Kebanyakan! Maksimal 50 spam.')

    // Deteksi mention
    const mentionUser = pesanRaw.match(/@(\d{5,})/g) || []
    const mentions = mentionUser.map(tag => tag.replace('@', '') + '@s.whatsapp.net')

    for (let i = 0; i < jumlah; i++) {
        await sleep(500) // beri delay biar gak diblock WA
        await conn.sendMessage(m.chat, {
            text: pesanRaw,
            mentions
        }, { quoted: m })
    }

    m.reply(`✅ Terkirim *${jumlah}* kali!`)
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  default:
    if (budy.startsWith('=>')) {
        if (!Creator) return reply(mess.creator);

        const util = require('util') // pastikan ini di atas file jika belum

        function Return(sul) {
            let sat = JSON.stringify(sul, null, 2)
            let bang = util.format(sat)
            if (sat == undefined) {
                bang = util.format(sul)
            }
            return m.reply(bang)
        }

        try {
            let result = await eval(`(async () => { return ${budy.slice(3)} })()`)
            Return(result)
        } catch (e) {
            m.reply(String(e))
        }
    }
if (budy.startsWith('>')) {
    if (!isCreator) return;
    try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        m.reply(String(err));
    }
}

if (budy.startsWith('$')) {
    if (!isCreator) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}

}
} catch (err) {
    console.log(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})


