/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				lightGray: "#7d7d7d",
				darkGray: "rgba(51, 51, 51, 1)",
				boldGray: "rgba(22, 22, 22, 1)",
				bgPurple: "#492249",
				blueColor: "#1B52BE",
				white: "#ffffff"
			},
		},
	},
	plugins: [],
};
