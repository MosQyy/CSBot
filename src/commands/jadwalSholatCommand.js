const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')

const Days = new Date();
const day = Days.getDate();
const month = Days.getMonth()+1 < 10 ? `0${Days.getMonth()+1}` : Days.getMonth()+1 ;
const year = Days.getFullYear();

const PREFIX = "$";

module.exports = {
    jadwalSholatCommand: function (message) {
        if (message.author.bot) return;
        if (message.content.startsWith(PREFIX)) {
            const command = message.content.substring(PREFIX.length);
            if (command === "pray") {
                fetch(
                    `https://api.banghasan.com/sholat/format/json/jadwal/kota/667/tanggal/${year}-${month}-${day}`
                )
                    .then(res => res.json())
                    .then(res => {
                        const emb = new MessageEmbed()
                            .setTitle("Jadwal Sholat Hari Ini")
                            .setColor("#18FF00")
                            .setDescription(
                                "================= || ================= \n "
                            )
                            .addFields(
                                {
                                    name: "Shubuh",
                                    value: `${res.jadwal.data.subuh} WIB`,
                                },
                                {
                                    name: "Dzuhur",
                                    value: `${res.jadwal.data.dzuhur} WIB`,
                                },
                                {
                                    name: "Ashar",
                                    value: `${res.jadwal.data.ashar} WIB`,
                                },
                                {
                                    name: "Maghrib",
                                    value: `${res.jadwal.data.maghrib} WIB`,
                                },
                                {
                                    name: "Isya",
                                    value: `${res.jadwal.data.isya} WIB`,
                                }
                            )
                            .setFooter(
                                "==================== || ===================="
                            );
                        message.channel.send(emb);
                    });
            }
        }
    },
};
