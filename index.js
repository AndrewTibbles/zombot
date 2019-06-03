const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
  console.log(`${client.user.username} is now online!`);
});


setInterval(function () {
  client.user.setActivity("Lending a hand");
}, 20000);

setTimeout(function () {
  setInterval(function () {
    client.user.setActivity("&help");
  }, 20000);
}, 10000);

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

// Create an event listener for new guild members
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Farewell, ${member}`);
});


client.on('message', message => {
  if (message.author.id === client.user.id) return;
  if (message.author.client === true) return;
  let args = message.content.slice(prefix.length).trim().split(' ');
  let msg = message.content.toLowerCase()
  let member = message.mentions.members.first();
  let user = message.member;
  if (message.author.id === client.user.id) return;
  if (msg.startsWith(`${prefix}ping`)) {
    message.channel.send(`:ping_pong:\nMy ping is ${Date.now() - message.createdTimestamp} ms. \n The lower the ping, the better. If my ping is very high then I may be expiriencing issues for the time being.`);
  } else
    if (msg.startsWith(prefix + "say")) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the required permissions to manage messages!");
      let botmessage = args.slice(1).join(" ");
      message.delete().catch();
      message.channel.send(botmessage);
    } else
      if (msg.startsWith(`${prefix}kick`)) {
        if (message.member.hasPermission(['KICK_MEMBERS'])) {

          if (!member) {
            console.log(user.displayName + ` forgot to say who too kick`);
            return message.reply("No user was mentioned!");
          } else

            if (member == user) {
              console.log(user.displayName + ` tried to kick themselves`);
              return message.reply(":face_palm: you cannot kick yourself silly!")
            } else
              if (member.hasPermission(['KICK_MEMBERS'])) {
                console.log(user.displayName + ` tried to kick an exempt user`);
                return message.reply("This user is exempt from being kicked!")
              } else
                if (user != member) {
                  member.kick().then((member) => {
                    console.log(`Successfully kicked ` + member.displayName);
                    return message.reply(":wave: " + member.displayName + " has been kicked!")
                  })
                  return;
                }
          let botmessage = args.slice(1).join(" ");
          message.delete().catch();
          message.channel.send(botmessage);
          return;
        } else
          if (!message.member.hasPermission(['KICK_MEMBERS'])) {
            let user = message.member;
            if (msg.startsWith(`${prefix}kick`)) {
              console.log(user.displayName + ` tried to use the kick command`);
              return message.reply(":x: You do not have the required permissions to use the kick command!");
            }
            let botmessage = args.slice(1).join(" ");
            message.delete().catch();
            message.channel.send(botmessage);
            return;
          }
        return;
      } else
        if (message.content.toLowerCase().startsWith(`${prefix}countdownsec`)) {
          let cdTime = args[1] //<< variable
          setInterval(function () {
            cdTime -= 1;
          }, 1000);
          let msTime = cdTime * 1000
          let cdEmbed = new Discord.RichEmbed()
            .setTitle("Countdown Anniciated!")
            .setColor("RANDOM")
            .addField("COUNTDOWN TIMER⏰", `${cdTime} seconds`)
          if (isNaN(cdTime)) return message.channel.send(`Thats not valid!`);
          let a;
          message.channel.send(cdEmbed).then(async function (m) {// << interval
            m.delete(10000)
            setInterval(function () {
              if (cdTime < 0) return;
              m.channel.send(cdTime).then(r => r.delete(100000000));
            }, 100000000);
            setTimeout(function () {
              m.channel.send(`${message.author}, your countdown has been completed.`)
            }, msTime);
          });
        } else
          if (message.content.toLowerCase().startsWith(`${prefix}countdownmin`)) {
            let cdTime = args[1] //<< variable
            setInterval(function () {
              cdTime -= 1;
            }, 1000);
            let msTime = cdTime * 60000
            let cdEmbed = new Discord.RichEmbed()
              .setTitle("Countdown Anniciated!")
              .setColor("RANDOM")
              .addField("TIMER⏰", `${cdTime} minutes`)
            if (isNaN(cdTime)) return message.channel.send(`Thats not valid!`);
            let a;
            message.channel.send(cdEmbed).then(async function (m) {// << interval
              m.delete(60000)
              setInterval(function () {
                if (cdTime < 0) return;
                m.channel.send(cdTime).then(r => r.delete(60000));
              }, 60000);
              setTimeout(function () {
                m.channel.send(`${message.author}, your countdown has been completed.`)
              }, msTime);
            });
          } else
            if (message.content.toLowerCase().startsWith(`${prefix}countdownhour`)) {
              let cdTime = args[1] //<< variable
              setInterval(function () {
                cdTime -= 1;
              }, 1000);
              let msTime = cdTime * 3600000
              let cdEmbed = new Discord.RichEmbed()
                .setTitle("Countdown Anniciated!")
                .setColor("RANDOM")
                .addField("COUNTDOWN TIMER⏰", `${cdTime} Hours`)
              if (isNaN(cdTime)) return message.channel.send(`Thats not valid!`);
              let a;
              message.channel.send(cdEmbed).then(async function (m) {// << interval
                m.delete(3600000)
                setInterval(function () {
                  if (cdTime < 0) return;
                  m.channel.send(cdTime).then(r => r.delete(100000000));
                }, 100000000);
                setTimeout(function () {
                  m.channel.send(`${message.author}, your countdown has been completed.`)
                }, msTime);
              });
            } else
              if (message.content.toLowerCase().startsWith(`${prefix}pvpstart`)) {
                let cdTime = args[1] //<< variable
                setInterval(function () {
                  cdTime -= 1;
                }, 1000);
                let msTime = cdTime * 1000
                let cdEmbed = new Discord.RichEmbed()
                  .setTitle("Countdown Anniciated!")
                  .setColor("RANDOM")
                  .addField("The PVP Event will commence in", `${cdTime} seconds`)
                if (isNaN(cdTime)) return message.channel.send(`Thats not valid!`);
                let a;
                message.channel.send(cdEmbed).then(async function (m) {// << interval
                  m.delete(10000)
                  setInterval(function () {
                    if (cdTime < 0) return;
                    m.channel.send(cdTime).then(r => r.delete(100000000));
                  }, 100000000);
                  setTimeout(function () {
                    m.channel.send(`@everyone The PVP Event has begun! Please stay safe and happy hunting.`)
                  }, msTime);
                });
              } else
                if (msg.startsWith(`${prefix}quote`)) {
                  var r = Math.floor(Math.random() * 4);
                  console.log(user.displayName + ` requested a quote.`);
                  switch (r) {
                    case 0:
                      message.channel.send(
                        '"Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you.”' +
                        '\n— *Tyrion’s sage advice to Jon about being a bastard*'
                      );
                      break;

                    case 1:
                      message.channel.send(
                        '“Any man who must say, ‘I am the king,’ is no true king. I’ll make sure you understand that when I’ve won your war for you.”' +
                        '\n— *Patriarch Tywin putting his grandson Joffrey in his place after he throws a tantrum when Tyrion speaks to him disrespectfully*'
                      );
                      break;

                    case 2:
                      message.channel.send(
                        '“The things I do for love.”' +
                        '\n— *Jaime to Cersei, while pushing Bran out of a tower when he sees the two siblings, um, getting intimate*'
                      );
                      break;

                    case 3:
                      message.channel.send(
                        '“There is only one thing we say to death: Not today.”' +
                        '\n— *Swordsman extraordinaire Syrio Forel to Arya, while teaching her how to fight'
                      );
                      break;
                  }
                  return;
                } else
                  if (msg.startsWith(`${prefix}hello`)) {
                    message.channel.send("Hello, " + user.displayName.toString() + "!")
                    console.log(user.displayName + ' ran the command &hello');
                    return;
                  } else
                    if (msg.startsWith(`${prefix}allys`)) {
                      message.channel.send("Hello, " + user.displayName.toString() + "! WOLVS current allies are: **GRILL**, **ROME**, **DRAY** and **LGND5**!")
                      console.log(user.displayName + ' ran the command &allys');
                      return;
                    } else
                      if (msg.startsWith(`${prefix}enemys`)) {
                        message.channel.send("Hello, " + user.displayName.toString() + "! WOLVS current enemies are: **TROLL**!")
                        console.log(user.displayName + ' ran the command &enemys');
                        return;
                      }
                      else
                        if (msg.startsWith(prefix + "info")) {
                          let changeEmbed = new Discord.RichEmbed()
                            .setTitle("__Info__")
                            .setColor("RANDOM")
                            .setTimestamp()
                            .addField(`Total Servers`, `${client.guilds.size}`)
                            .addField(`Total Members`, `${client.users.size}`)
                            .addField("Basic Info", "I am a simple bot, when you just need a little help with something.")
                            .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/biohazard-sign_2623.png")
                            .addField(`Created By`, `${client.users.get(`97017547458633728`).tag}`)
                            .setFooter(`${client.user.tag} | Stats`, message.author.avatarURL)
                          message.channel.send(changeEmbed)
                        }
                        else
                          if (msg.startsWith(`${prefix}help`)) {
                            console.log(user.displayName + ' ran the command &help');
                            let embed = new Discord.RichEmbed()
                              .setColor("RANDOM")
                              .setTitle("Hello, **" + user.displayName + "**!", "** **")
                              .addField("I am your friendly bot created by **zombsta123**.",
                                "I'm here to help unfortunatly i am still a WIP so changes may occur frequently.")
                              .addField("** **", "** **")
                              .addField("Join the development discord channel https://discord.gg/bN4dNmm", "** **")
                              .addField("**Commands**", "** **")
                              .addField("* `&countdownsec <number of seconds>`", "Have me send a countdown and notify you when done!")
                              .addField("* `&countdownmin <number of minutes>`", "Have me send a countdown for minutes and notify you when done!")
                              .addField("* `&countdownhour <number of hours>`", "Have me send a countdown for an amount of hours. And notify you when done.")
                              .addField("* `&say`", "(Manage messages permission required,) have me say something!")
                              .addField("* `&help`", "See all my commands")
                              .addField("* `&info`", "See bot information and statistics")
                              .addField("* `&ping`", "See my ping.")
                              .addField("* `&hello`", "Get a friendly greeting.")
                              .addField("* `&quote`", "Get a random Game Of Thrones quote.")
                              .addField("* `&kick <user>`", "Removes a user from the channel.")
                              .addField("* `&pvpstart <seconds>`", "Countdowns the pvp event with value in seconds.")
                              .addField("* `&enemys`", "Gives a list of all our enemys.")
                              .addField("* `&allys`", "Gives a list of all our allies.")
                            message.channel.send(embed)
                            //message.member.send(embed)
                            message.react(`👌`);
                            return;
                            //.addField("&info", "See my information!")
                            //.addField("&img", "Forgot what a clock looks like? No problem! I will send a clock image just for you!")
                          } else
                            if (msg.startsWith(prefix + "stop")) {
                              let mID = message.author.id;
                              if (mID != 97017547458633728) return message.channel.send("You do not have permission to execute this command!")

                              message.channel.send("Stopping self...")
                              console.log(`Bot stopped in #${message.channel.name} by ${message.member.displayName}`)
                              client.destroy()
                            } else
                              if (msg.startsWith(`${prefix}`)) {
                                if (message.author.bot) {
                                  return;
                                }
                                else {
                                  message.channel.send("Sorry, " + user.displayName.toString() + ". I don't understand the command `" + msg + "`. Try `&help`")
                                  console.log(user.displayName + ' ran an unknown command');
                                  return;
                                }
                              }
})

client.login(token).then(
  console.log("Logged into zombot")
)