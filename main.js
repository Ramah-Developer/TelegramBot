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
    simple
} = require("./lib/myfunc")
const fs = require('fs')
const os = require('os')
const speed = require('performance-now')
const axios = require('axios')
if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
    return console.log("tidak ada token")
}
const { Client } = require('ssh2');
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')


const adminfile = 'lib/adminID.json';
const premiumUsersFile = 'lib/premiumUsers.json';
try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}
try {
    adminUsers = JSON.parse(fs.readFileSync(adminfile));
} catch (error) {
    console.error('Error reading adminUsers file:', error);
}

async function uploadToCdn(Path) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(Path)) return reject(new Error("File tidak ditemukan."));
        try {
            const form = new BodyForm();
            form.append("file", fs.createReadStream(Path));
            const response = await axios({
                url: "https://cdn.meitang.xyz/upload",
                method: "POST",
                headers: {
                    ...form.getHeaders()
                },
                data: form
            });
            return resolve(response.data.file.url)
        } catch (err) {
            return reject(new Error(`Gagal upload: ${err.message}`));
        }
    });
}

const bot = new Telegraf(BOT_TOKEN)

async function startalfixd() {
    bot.on('callback_query', async (alfixd) => {
        // Split the action and extract user ID
        const action = alfixd.callbackQuery.data.split(' ');
        const user_id = Number(action[1]);

        // Check if the callback is from the correct user
        if (alfixd.callbackQuery.from.id !== user_id) {
            return alfixd.answerCbQuery('Uppss... this button not for you!', {
                show_alert: true
            });
        }

        const timestampi = speed();
        const latensii = speed() - timestampi;
        const user = simple.getUserName(alfixd.callbackQuery.from);
        const pushname = user.full_name;
        const username = user.username ? user.username : "alfisyahrial";
        const isCreator = [alfixd.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(username);
        
        const reply = async (text) => {
            for (let x of simple.range(0, text.length, 4096)) { // Split text to avoid overflow
                await alfixd.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                });
            }
        };
    
    
const domain = global.domain;
const plta = global.plta;
const pltc = global.pltc;        
        
        
        try {
            switch (action[0]) {
  
            }
        } catch (e) {
            console.log(e)
        }
    })        
    bot.command('help', async (alfixd) => {
    let user = simple.getUserName(alfixd.message.from);
    await alfixd.reply(lang.first_chat(BOT_NAME, user.full_name), {
        parse_mode: "MarkdownV2", // Updated to "MarkdownV2"
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'My Youtube',
                    url: "https://www.youtube.com/@alwaysfii"
                }, {
                    text: 'OWNER 😁',
                    url: OWNER[0]
                }]
            ]
        }
    });
});


bot.on('tourl', async (alfixd) => {
  const message = alfixd.message;

  // Check if the message contains a media file
  if (message.photo || message.video || message.audio || message.document) {
    try {
      // Get the file ID based on the type of media
      const fileId = message.photo
        ? message.photo[message.photo.length - 1].file_id
        : message.video
        ? message.video.file_id
        : message.audio
        ? message.audio.file_id
        : message.document.file_id;

      // Download the file from Telegram
      const fileLink = await alfixd.telegram.getFileLink(fileId);
      const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
      const fileName = `media_${Date.now()}`;
      const filePath = `./${fileName}`;
      
      // Save the media to disk
      fs.writeFileSync(filePath, response.data);

      // Try uploading to Pomf
      try {
        const url = await uploadToPomf(filePath);
        await alfixd.reply(`Link: ${url}`);
      } catch (err) {
        // If Pomf upload fails, try uploading to CDN
        try {
          const urll = await uploadToCdn(filePath);
          await alfixd.reply(`Link: ${urll}`);
        } catch (err) {
          await alfixd.reply('Error uploading the media');
        }
      }

      // Remove the saved media file after uploading
      fs.unlinkSync(filePath);
    } catch (err) {
      await alfixd.reply('Failed to process the media');
    }
  } else {
    // If not a supported media type, send a reply
    await alfixd.reply('Harus berupa video, gambar, audio, atau stiker');
  }
});

bot.command('listadmin', async (alfixd) => {
    const chatId = alfixd.chat.id;
    const userId = alfixd.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));
    if (!isAdmin) {
        await alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', Markup.inlineKeyboard([
            [Markup.button.url('HUBUNGI ADMIN', 'https://t.me/alfisyahrial')]
        ]));
        return;
    }

    let page = '1';
    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await response.json();
        let users = res.data;

        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'Script By alfixd\n';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('BACK', JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 })),
                Markup.button.callback('NEXT', JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }))
            ]
        ]);

        await alfixd.reply(messageText, keyboard);

    } catch (err) {
        console.error(err);
        await alfixd.reply('Terjadi kesalahan dalam mengambil data admin.');
    }
});

bot.action(/{"action":"back","page":\d+}/, async (alfixd) => {
    const data = JSON.parse(alfixd.match[0]);
    let page = data.page;
    if (page < 1) {
        page = 1;
    }
    // Panggil kembali API dengan page yang diminta
    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await response.json();
        let users = res.data;

        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'By alfixd\n';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('BACK', JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 })),
                Markup.button.callback('NEXT', JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }))
            ]
        ]);

        await alfixd.editMessageText(messageText, keyboard);

    } catch (err) {
        console.error(err);
        await alfixd.reply('Terjadi kesalahan dalam mengambil data admin.');
    }
});

bot.action(/{"action":"next","page":\d+}/, async (alfixd) => {
    const data = JSON.parse(alfixd.match[0]);
    let page = data.page;
    // Panggil kembali API dengan page yang diminta
    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await response.json();
        let users = res.data;

        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'By alfixd\n';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('BACK', JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 })),
                Markup.button.callback('NEXT', JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }))
            ]
        ]);

        await alfixd.editMessageText(messageText, keyboard);

    } catch (err) {
        console.error(err);
        await alfixd.reply('Terjadi kesalahan dalam mengambil data admin.');
    }
});



bot.command('createadmin', async (alfixd) => {
  const chatId = alfixd.chat.id;
  const userId = alfixd.from.id;

  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }

  const commandParams = alfixd.message.text.split(' ')[1]; // Ambil argumen perintah
  if (!commandParams) {
    alfixd.reply('Format Salah! Penggunaan: /createadmin namapanel,idtele');
    return;
  }

  const params = commandParams.split(',');
  if (params.length < 2) {
    alfixd.reply('Format Salah! Penggunaan: /createadmin namapanel,idtele');
    return;
  }

  const panelName = params[0].trim();
  const telegramId = params[1].trim();
  const password = panelName + "117";

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: `${panelName}@gmail.com`,
        username: panelName,
        first_name: panelName,
        last_name: "Memb",
        language: "en",
        root_admin: true,
        password: password
      })
    });

    const data = await response.json();

    if (data.errors) {
      alfixd.reply(JSON.stringify(data.errors[0], null, 2));
      return;
    }

    const user = data.attributes;
    const userInfo = `
TYPE: user
➟ ID: ${user.id}
➟ USERNAME: ${user.username}
➟ EMAIL: ${user.email}
➟ NAME: ${user.first_name} ${user.last_name}
➟ LANGUAGE: ${user.language}
➟ ADMIN: ${user.root_admin}
➟ CREATED AT: ${user.created_at}
➟ LOGIN: ${domain}
    `;

    alfixd.reply(userInfo);
    bot.telegram.sendMessage(telegramId, `
╭──❏「 INFO DATA ADMIN PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
➡️ Rules : 
• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!

NGEYEL? KICK NO REFF NO DRAMA
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
THANKS FOR BUYING AT alfixd
    `);
  } catch (error) {
    console.error(error);
    alfixd.reply('Terjadi kesalahan dalam pembuatan admin. Silakan coba lagi nanti.');
  }
});




bot.command('1gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /1gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '1gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '1024';
  const cpu = '30';
  const disk = '1024';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});


bot.command('unli', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /unli namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + 'unli';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '0';
  const cpu = '0';
  const disk = '0';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});


bot.command('2gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /2gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '2gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '2024';
  const cpu = '40';
  const disk = '2024';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('3gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /3gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '3gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '3072';
  const cpu = '90';
  const disk = '3072';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('4gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /4gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '4gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '4048';
  const cpu = '110';
  const disk = '4048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});



bot.command('cekid', (alfixd) => {
    const sender = alfixd.from.username || "User";
    const text12 = `Hi @${sender} 👋
    
👤 From ${alfixd.from.id}
  └🙋🏽 kamu
  
 ID Telegram Anda: ${alfixd.from.id}
 Full Name Anda : @${sender}

🙏🏼 Permisi, bot akan pergi secara otomatis.
 Developer : @alfisyahrial`;

    // Mengirim pesan teks tanpa keyboard interaktif
    alfixd.reply(text12, { parse_mode: 'Markdown' });
});




bot.command('5gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /5gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '5gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '5048';
  const cpu = '140';
  const disk = '5048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('6gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /6gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '6gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '6048';
  const cpu = '170';
  const disk = '6048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('7gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /7gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '7gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '7048';
  const cpu = '200';
  const disk = '7048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});


bot.command('8gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /8gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '8gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '8048';
  const cpu = '230';
  const disk = '8048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});










bot.command('listsrv', async (alfixd) => {
    const chatId = alfixd.chat.id;
    const userId = alfixd.from.id;

const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }




    let page = 1;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";

        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });

            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        alfixd.reply(messageText);
    } catch (error) {
        console.error(error);
        alfixd.reply('Terjadi kesalahan dalam memproses permintaan.');
    }
});
  
  bot.command('1gb', async (alfixd) => {
  const text = alfixd.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(alfixd.from.id));

  if (!isAdmin) {
    alfixd.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/alfisyahrial' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return alfixd.reply('Invalid format. Usage: /1gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '1gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '1024';
  const cpu = '30';
  const disk = '1024';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return alfixd.reply('Email already exists. Please use a different email.');
      } else {
        return alfixd.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return alfixd.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    alfixd.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      alfixd.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ alfixd STORE  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI alfixd
ADA KENDALA CHAT alfixd YA `,
      });
      alfixd.reply('PANEL CREATE SUKSES.');
    }
  } else {
    alfixd.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

  
 bot.command('installpanel', async (alfixd) => {
  const text = alfixd.message.text.split(' ')[1]; // Mengambil argumen setelah perintah /installpanel
  if (!text) {
    return alfixd.reply('Format salah!\nPenggunaan: /installpanel ipvps,password,domainpnl,domainnode,ramvps (contoh: 8000 = ram 8)\nscript by alfixd');
  }
  
  const t = text.split(',');
  if (!global.adminId.includes(String(alfixd.from.id))) {
    return alfixd.reply('Fitur Ini Khusus Owner Saya!!!');
  }

  if (t.length < 5) {
    return alfixd.reply('Format salah!\nPenggunaan: /installpanel ipvps,password,domainpnl,domainnode,ramvps ( contoh : 8000 = ram 8\nscript by alfixd');
  }

  const ipvps = t[0];
  const passwd = t[1];
  const subdomain = t[2];
  const domainnode = t[3];
  const ramvps = t[4];

  const connSettings = {
    host: ipvps,
    port: 22,
    username: 'root',
    password: passwd
  };

  let password = generateRandomPassword();
  const command = 'bash <(curl -s https://pterodactyl-installer.se)';
  const commandWings = 'bash <(curl -s https://pterodactyl-installer.se)';
  const conn = new Client();

  conn.on('ready', () => {
    alfixd.reply('PROSES PENGINSTALLAN SEDANG BERLANGSUNG MOHON TUNGGU 5-10MENIT\nscript by alfixd');
    conn.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on('close', (code, signal) => {
        console.log(`Stream closed with code ${code} and signal ${signal}`);
        installWings(conn, domainnode, subdomain, password, ramvps);
      }).on('data', (data) => {
        handlePanelInstallationInput(data, stream, subdomain, password);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(connSettings);

  async function installWings(conn, domainnode, subdomain, password, ramvps) {
    alfixd.reply('PROSES PENGINSTALLAN WINGS SEDANG BERLANGSUNG MOHON TUNGGU 5 MENIT\nscript by alfixd');
    conn.exec(commandWings, (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log('Wings installation stream closed with code ${code} and signal ${signal}');
        createNode(conn, domainnode, ramvps, subdomain, password);
      }).on('data', (data) => {
        handleWingsInstallationInput(data, stream, domainnode, subdomain);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }

  async function createNode(conn, domainnode, ramvps, subdomain, password) {
    const command = 'bash <(curl -s https://raw.githubusercontent.com/wndrzzka/installer-pterodactlty/main/install.sh)';
    alfixd.reply('MEMULAI CREATE NODE & LOCATION\nscript by alfixd');
    conn.exec(command, (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log('Node creation stream closed with code ${code} and ${signal} signal');
        conn.end();
        sendPanelData(subdomain, password);
      }).on('data', (data) => {
        handleNodeCreationInput(data, stream, domainnode, ramvps);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }

  function sendPanelData(subdomain, password) {
    alfixd.reply(`DATA PANEL ANDA\n\nUSERNAME: admin\nPASSWORD: ${password}\nLOGIN: ${subdomain}\n\nNote: Semua Instalasi Telah Selesai Silahkan Create Allocation Di Node Yang Di buat Oleh Bot Dan Ambil Token Configuration dan ketik .startwings (token) \nNote: HARAP TUNGGU 1-5MENIT BIAR WEB BISA DI BUKA\nscript by alfixd`);
  }

  function handlePanelInstallationInput(data, stream, subdomain, password) {
    const input = data.toString();
    if (input.includes('Input')) stream.write('0\n');
    if (input.includes('Input')) stream.write('\n');
    if (input.includes('Input')) stream.write('1248\n');
    if (input.includes('Input')) stream.write('Asia/Jakarta\n');
    if (input.includes('Input')) stream.write('admin@gmail.com\n');
    if (input.includes('Input')) stream.write('admin\n');
    if (input.includes('Input')) stream.write(`${password}\n`);
    if (input.includes('Input')) stream.write(`${subdomain}\n`);
    if (input.includes('Input')) stream.write('y\n');
    if (input.includes('Please read the Terms of Service')) stream.write('A\n');
    if (input.includes('Input')) stream.write('1\n');
    console.log('STDOUT: ' + data);
  }

  function handleWingsInstallationInput(data, stream, domainnode, subdomain) {
    const input = data.toString();
    if (input.includes('Input')) stream.write('1\n');
    if (input.includes('Input')) stream.write('y\n');
    if (input.includes('Input')) stream.write(`${subdomain}\n`);
    if (input.includes('Input')) stream.write(`${domainnode}\n`);
    if (input.includes('Input')) stream.write('admin@gmail.com\n');
    console.log('STDOUT: ' + data);
  }

  function handleNodeCreationInput(data, stream, domainnode, ramvps) {
    stream.write('iniwannbroku\n');
    stream.write('4\n');
    stream.write('SGP\n');
    stream.write('Autonode WannFyy\n');
    stream.write(`${domainnode}\n`);
    stream.write(`${ramvps}\n`);
    stream.write('1\n');
    console.log('STDOUT: ' + data);
  }
});



bot.hears(/\/3 (.+) (.+)/, async (alfixd) => {
  const subdomain = alfixd.match[1];
  const ip = alfixd.match[2];
  const userId = alfixd.from.id;
  
  // Memanggil fungsi createSubdomain
  const response = await createSubdomain(subdomain, ip, 'e60307683c18389584e9ae2f9fa707b2', '9hc8x5B4TewRTpXxETV_laVGksk3MyCfBXOgHgmg');
  
  if (response.success) {
    await alfixd.reply(response.message);
  } else {
    await alfixd.reply('Failed to create subdomain.');
  }
});



           
    bot.on('message', async (alfixd) => {
        require("./case")(alfixd, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/alfisyahrial"
        })
    })
}
startalfixd()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))