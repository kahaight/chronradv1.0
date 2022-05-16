const { SlashCommandBuilder } = require('@discordjs/builders');
const cron = require('node-cron');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remind')
		.setDescription('Set a reminder')
		.addStringOption(option1 =>
			option1.setName('day')
				.setDescription('Day of the week for the reminder')
				.setRequired(false))
		.addStringOption(option2 =>
			option2.setName('starttime')
				.setDescription('between 0 and 23')
				.setRequired(false))
		.addStringOption(option3 =>
			option3.setName('endtime')
				.setDescription('between 0 and 23')
				.setRequired(false))
		.addStringOption(option4 =>
			option4.setName('frequency')
				.setDescription('between 1 and 60 minutes')
				.setRequired(false)),
	async execute(interaction) {
		let interval = "*";
		let hourOfDay = "*";
		const dayOfMonth = "*";
		const month = "*";
		let dayOfWeek = "*";

		const urls = ['https://tenor.com/view/inside-job-inside-job-r-time-card-gif-24165833', 'https://tenor.com/view/timesheet-gif-25467043', 'https://tenor.com/view/timesheet-gif-25665364', 'https://tenor.com/view/timesheet-gif-25597985', 'https://tenor.com/view/timesheet-gif-25665430', 'https://tenor.com/view/timecard-timesheets-time-is-lies-do-your-time-gif-13896051', 'https://tenor.com/view/bold-timesheet-gif-25383544', 'https://tenor.com/view/timesheet-gif-25537296'];

		const day = interaction.options.getString('day').toLowerCase();
		const start = interaction.options.getString('starttime');
		const end = interaction.options.getString('endtime');
		const freq = interaction.options.getString('frequency');

		if (day && start && end && freq) {
			if (start >= 0 && start <= 23 && end >= 0 && end <= 23 && start < end) {
				hourOfDay = `${start}-${end}`;
			} else {
				hourOfDay = false;
			}
			if (freq >= 1 && freq <= 60) {
				interval = '*/' + freq;
			}
			switch (day) {
			case 'sunday':
				dayOfWeek = '0';
				break;
			case 'saturday':
				dayOfWeek = '6';
				break;
			case 'monday':
				dayOfWeek = '1';
				break;
			case 'tuesday':
				dayOfWeek = '2';
				break;
			case 'wednesday':
				dayOfWeek = '3';
				break;
			case 'thursday':
				dayOfWeek = '4';
				break;
			case 'friday':
				dayOfWeek = '5';
				break;
			default:
				dayOfWeek = false;
			}
			if (interval && hourOfDay && dayOfMonth && dayOfWeek && month) {
				if (cron.validate(interval + ' ' + hourOfDay + ' ' + dayOfMonth + ' ' + month + ' ' + dayOfWeek)) {
					cron.schedule(interval + ' ' + hourOfDay + ' ' + dayOfMonth + ' ' + month + ' ' + dayOfWeek, function() {
						interaction.channel.send(urls[Math.floor(Math.random() * urls.length)]);
					});
					return interaction.reply('https://tenor.com/view/mr-bean-calendar-check-schedule-check-calendar-gif-19062732');
				}
			}
			else {
				return interaction.reply(`https://tenor.com/view/aaaron-key-and-peele-donemessedup-gif-8650312
				Interval: ${interval}
                Day of week: ${dayOfWeek}
                Hour of Day: ${hourOfDay}
				Day of month: ${dayOfMonth}
				Month: ${month}`);
			}
		}
		else {
			return interaction.reply(`https://tenor.com/view/aaaron-key-and-peele-donemessedup-gif-8650312
			Interval: ${interval}
			Day of week: ${dayOfWeek}
			Hour of Day: ${hourOfDay}
			Day of month: ${dayOfMonth}
			Month: ${month}`);
		}
	},
};

