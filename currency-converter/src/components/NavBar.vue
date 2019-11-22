<template>
	<div class="navigation">
   		<router-link to="/">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 16"><defs/><path fill="#A7ADC6" fill-rule="nonzero" d="M7.27.02c-.73 0-1.47.24-2.05.7h-2.3l.84 4.54C2.4 6.49 0 9.1 0 12.36c0 1.46.44 2.62 1.32 3.44l.2.2h11.5l.2-.2a4.52 4.52 0 001.33-3.44c0-3.25-2.4-5.87-3.76-7.1l.83-4.53h-2.3a3.26 3.26 0 00-2.05-.7zm0 1.45c.46 0 .93.17 1.27.5l.21.21h1.12l-.4 2.18h-4.4l-.4-2.18H5.8l.22-.2c.34-.34.8-.5 1.26-.5zM5.34 5.82H9.2c.78.62 3.88 3.3 3.88 6.54 0 .94-.22 1.65-.67 2.19H2.12a3.24 3.24 0 01-.67-2.19c0-3.23 3.1-5.91 3.89-6.54zm-.25 1.45v2.91h-.73v.73h.73v.73h-.73v.72h.73v1.46h1.46v-1.46h.72v-.72h-.72v-.73h1.09a1.82 1.82 0 100-3.64H5.09zm1.46 1.46h1.09a.36.36 0 010 .72h-1.1v-.72z"/></svg>
		   	<span>Текущий курс</span>
		</router-link>
				
    	<router-link to="/convert">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><defs/><path fill="#A7ADC6" fill-rule="nonzero" d="M8 0a7.98 7.98 0 00-6.3 12.92H0v1.23h3.7v-3.69H2.45v1.4a6.75 6.75 0 018.62-9.9V.62A8.29 8.29 0 008 0zm4.3 1.85v3.69h1.24v-1.4a6.75 6.75 0 01-8.62 9.9v1.34a7.98 7.98 0 009.38-12.3H16V1.85h-3.7zM7.39 3.08v1.25a2.17 2.17 0 00-1.84 2.13c0 1.18.97 2.16 2.15 2.16h.62c.54 0 .92.38.92.92s-.38.92-.92.92H6.15v1.23h1.23v1.23h1.24v-1.25a2.17 2.17 0 001.84-2.13c0-1.18-.97-2.16-2.15-2.16h-.62a.89.89 0 01-.92-.92c0-.54.38-.92.92-.92h2.16V4.3H8.62V3.08H7.38z"/></svg>
			<span>Конвертер валюты</span>
		</router-link>
	</div>
</template>

<style>
.navigation a{
	padding-bottom: 24px;
	position: relative;
	margin-left:40px;
	font-size: 14px;
	font-weight: bold;
	text-decoration: none;
	color: var(--text-color-gray);

	display: flex;
  	align-items: center;
}

.navigation svg{
	padding-right:8px;
	width:16px;
}
.navigation a.router-link-exact-active{
	color: var(--text-color-black);
}
.navigation a.router-link-exact-active svg path{
	fill: var(--text-color-black);
}
.navigation a:first-child{margin-left:0;}

.navigation a.router-link-exact-active::after {
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 8px 8px 8px;
	border-color: transparent transparent #fff transparent;
	left:50%;
	transform: translate(-50%);
	bottom:0;
}
.navigation{
	display: flex;
  	justify-content: center;
	  padding-top: 24px;
}
</style>