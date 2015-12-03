# COP4331-Group4
<div>
	<img align="right" src="https://github.com/aurbinaUCF/COP4331-Group4/blob/master/html/assets/images/logoKT.png" alt="Knight Tracker" width="250"/>
<p> This is our repository created for our group 4, `Knight Tracker` Project, in COP4331 Fall2015 @UCF.</p>
	
		
</div>

<h2> Members: </h2>
<ul>
	<li>Alberto Urbina</li>
	<li>Sagar Mistry</li>
	<li>Cristian Perez</li>
	<li>Montrel McCall</li>
</ul>


<h2>Build Instructions </h2>

<h3>Requirements</h3>
<ul>
<li>Node.js  - https://nodejs.org/en/</li>
<li>Local Server System </li><ul>
	<li>Windows – ( UniServerX ) - http://www.uniformserver.com/</li>
	<li>Mac – AMPPS  - http://www.ampps.com/</li>
</ul>
</ul>
<h2>Set Up Your Environment</h2>
<ul>
<li>Download and Install Node.js</li>
<li>Download and Install your respective local server system application (Windows or Mac)</li>
<li>Download the website from GitHub as .zip</li></ul>
<h3>To Run Software</h3>
<ul>	
	<li>Unzip website</li>
	<li>Follow instructions based off your Operating System</li>
<ul>	
	<u><i>Macintosh:</i></u>
	<ul>
	  <li>Installing Website Files:</li>
		<ul>
			<li>Verify you have installed AMPPS </li>
			<li>Locate AMPPS folder in your Applications Folder</li>
			<li>Navigate to /AMPPS/www</li>
			<li>Copy your “/” folder (may also be “:” folder”) into your /AMPPS/www folder</li>
		</ul>
	 <li><i> Starting Node.js Server</i></li>
		<ul>
			<li>Using Terminal, locate the /AMPPS/www/ file </li>
			<li>Enter the following:</li>
			<ul>
				<code>$ cd server</br>
					$ node server.js</code>
			</ul>
		<li>If success should read  “Started Server @ http://localhost:8081”</li>	
		</ul>
	   <li> Verifying Success of Website </li>
	   	<ul>
			<li>Using your Internet Browser (Google Chrome Recommend), navigate to <i>http://localhost</i></li>
		</ul>
	</ul>

 	<u><i>Windows</i></u>
	    <ul>
	      <li>Installing Website Files:</li>
	      <ul>
				<li>Verify you have installed UniServerX and UniController</li>
				<li>Open UniController</li>
				<li>At the top, click on Apache> Change Apache-root Folders>Select new server Root-Folder (www)</li>
				<li>Locate unzipped website and select the “/” folder (also may be called “:” folder) and hit “OK”</li>
				<li>Click on “Start Apache”</li>
		  </ul>
	      <li>Starting Node.js Server</li>
			<ul>
				<li>Using command prompt, locate the “/”folder</li> 
				<li>Enter the following:</li>
				<code> > cd ./server</br>
				> node server.js </code>
			</ul>
		<li>If success should read  “Started Server @ http://localhost:8081”</li>		
	    <li> Verifying Success of Website </li>
		<li>Using your Internet Browser (Google Chrome Recommend), navigate to http://localhost</li>
</ul>