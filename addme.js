setInterval(function () {
    bot.user.setActivity("TICK TOCK GOES CLOCK");
}, 20000);

setTimeout(function () {
    setInterval(function () {
        bot.user.setActivity("&help");
    }, 20000);
}, 10000);

bot.on('message', message => {

    if (msg.startsWith(prefix + "say")) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No!");
        let botmessage = args.slice(1).join(" ");
        message.delete().catch();
        message.channel.send(botmessage);
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
                .addField("TIMER⏰", `${cdTime} seconds`)
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
            if (message.content.toLowerCase().startsWith(`${prefix}countdownhour`)) {
                let cdTime = args[1] //<< variable
                setInterval(function () {
                    cdTime -= 1;
                }, 1000);
                let msTime = cdTime * 3600000
                let cdEmbed = new Discord.RichEmbed()
                    .setTitle("Countdown Anniciated!")
                    .setColor("RANDOM")
                    .addField("TIMER⏰", `${cdTime} Hours`)
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
                if (msg.startsWith(prefix + "help")) {
                    let embed = new Discord.RichEmbed()
                        .setTitle("Commands")
                        .setColor("RANDOM")
                        .addField("&countdownsec (number of seconds here)", "My main command. Have me send a countdown and notify you when done!")
                        .addField("&countdownmin (number of minutes here)", "Have me send a countdown for minutes and notify you when done!")
                        .addField("&countdownhour (number of hours here)", "Have me send a countdown for an amount of hours. And notify you when done.")
                        .addField("&say", "(Manage messages permission required,) have me say something!")
                        .addField("&img", "Forgot what a clock looks like? No problem! I will send a clock image just for you!")
                        .addField("&help", "See all my commands")
                        .addField("&ping", "See my ping.")
                        .addField("&info", "See my information!")
                    message.member.send(embed)
                    message.react(`⏰`);
                } else
                    if (message.content.toLowerCase() === `${prefix}img`) {
                        let api = "clocks";
                        randomsnail(api).then(api => {
                            let embed = new Discord.RichEmbed()
                                .setTitle("r/clocks. Powered by reddit.")
                                .setColor("RANDOM")
                                .setImage(api)
                            message.channel.send(embed)
                        })
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

                            if (msg.startsWith(prefix + "info")) {
                                let changeEmbed = new Discord.RichEmbed()
                                    .setTitle("__Info__")
                                    .setColor("RANDOM")
                                    .setTimestamp()
                                    .addField(`Total Servers`, `${bot.guilds.size}`)
                                    .addField(`Total Members`, `${bot.users.size}`)
                                    .addField("Basic Info", "I am a simple countdown clock used, when you just need to time something. *Ill be back in a minute*, says your friend. ***Really?! Lets find out***. Stuff like that.")
                                    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/alarm-clock_23f0.png")
                                    .addField(`Created By`, `${bot.users.get(`446491815491665922`).tag}`)
                                    .setFooter(`${bot.user.tag} | Stats`, message.author.avatarURL)
                                message.channel.send(changeEmbed)
                            } else
                                if (msg.startsWith(prefix + "stop")) {
                                    let mID = message.author.id;
                                    if (mID != 446491815491665922) return message.channel.send("You do not have permission to execute this command!")

                                    message.channel.send("Stopping self...")
                                    console.log(`Bot stopped in #${message.channel.name} by ${message.member.displayName}`)
                                    bot.destroy()
                                }
});

