const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
  console.log(`${client.user.username} is now online!`);
});

client.on('message', message => {
  let member = message.mentions.members.first();
  let user = message.member;
  if (message.content.startsWith(`${prefix}kick`)) {
    if (message.member.hasPermission(['KICK_MEMBERS'])) {

      if (!member) {
        message.channel.send(user.displayName.toString() + " No user was mentioned!")
        console.log(user.displayName + ` forgot to say who too kick`);
        return;
      }
      if (member == user) {
        message.channel.send(":face_palm: " + user.displayName.toString() + " you cannot kick yourself silly!")
        console.log(user.displayName + ` tried to kick themselves`);
        return;
      }
      if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
        message.channel.send(user.displayName.toString() + " This user is exempt from being kicked!")
        console.log(user.displayName + ` tried to kick an exempt user`);
        return;
      }
      if (user != member) {
        member.kick().then((member) => {
          message.channel.send(":wave: " + member.displayName + " has been kicked!")
          console.log(`Successfully kicked` + member.displayName);
        })
        return;
      }
      return;
    }
    if (!message.member.hasPermission(['KICK_MEMBERS'])) {

      let user = message.member;

      if (message.content.startsWith(`${prefix}kick`)) {
        message.channel.send(":x: " + user.displayName.toString() + " you do not have the required permissions to use the kick command!")
        console.log(user.displayName + ` tried to use the kick command`);
        return;
      }
      return;
    }
    return;
  }
  else if (message.content.startsWith(`${prefix}quote`)) {
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
  }
  else if (message.content.startsWith(`${prefix}hello`)) {
    message.channel.send("Hello, " + user.displayName.toString() + "!")
    console.log(user.displayName + ' ran the command &hello');
    return;
  }
  else if (message.content.startsWith(`${prefix}help`)) {
    message.channel.send("Hello, " + user.displayName.toString() + "! I am your friendly bot created by zombsta123. I'm here to help unfortunatly i am still a WIP so changes may occur frequently.\n\n" + "Current commands:\n" + "\n* &help \n* &hello\n* &quote \n* &kick <user> \n* &allys \n* &enemys")
    console.log(user.displayName + ' ran the command &help');
    return;
  }
  else if (message.content.startsWith(`${prefix}allys`)) {
    message.channel.send("Hello, " + user.displayName.toString() + "! WOLVS current allies are: **GRILL**, **ROME**, **DRAY** and **LGND5**!")
    console.log(user.displayName + ' ran the command &allys');
    return;
  }
  else if (message.content.startsWith(`${prefix}enemys`)) {
    message.channel.send("Hello, " + user.displayName.toString() + "! WOLVS current enemies are: **TROLL**!")
    console.log(user.displayName + ' ran the command &enemys');
    return;
  }
  else {
    if (message.content.startsWith(`${prefix}`)) {
      if (message.author.bot) {
        return;
      }
      else {
        message.channel.send("Sorry, " + user.displayName.toString() + ". I don't understand the command `" + message.content + "`. Try `&help`")
        console.log(user.displayName + ' ran an unknown command');
        return;
      }
    }

  }
})

client.login(token);