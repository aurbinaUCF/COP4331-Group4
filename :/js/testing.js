 function testMode(which){
	switch(which){
		case 0:
			name = "John Doe";
			email = "JohnDoe@Knights.ucf.edu";
			company = "Random Company Inc";
			profilepic = "imgs/avatar.jpg";
			token = "A8asd8DH";
			bio = "This is a quick little bio section about me John Doe.";	
			textprojects = "Project1-readme.txt-anothersampletext.txt-text3.txt;TheseAreDynammic-textfile.txt;Project3-textfile.txt";
			todo = "This is all put in from the javascript;Another Todo;The Last Todo";			
			ismanager = true;	
			setCookie("User", "0", 1);	
			break;
		case 1:
			name = "Granny G";
			email = "GrannyG@knights.ucf.edu";
			profilepic = "http://www.smartsandstamina.com/wp-content/uploads/2013/07/Grandma.jpg";
			token = "Casd41C";
			bio = "This is a quick little bio section about me Granny G.";
			textprojects = "CatTakeover-HowToDealWith20Cats.txt-MyLifeWithTheCats.txt";
			setCookie("User", "1", 1);	
			todo = "Find my reading glasses;Cook for my Grandchildren;Feed Cats;Code program to take over the world";
			ismanager = false;		
			break;
		case 2:
			name = "Aang";
			email = "Aang@knights.ucf.edu";
			profilepic = "http://farm3.static.flickr.com/2567/3711527781_db9987ee83_o.jpg";
			token = "A8asd8DH";
			bio = "While I still have a lot to learn before I save anyone, I believe I can save the world... through programming projects.";
			todo = "Master the elements;Defeat Fire Lord;Eat Egg Custard Tart";			
			setCookie("User", "2", 1);
			textprojects = "Waterbending-Howtobendwaves4Dummies.txt-Ancientwaterscroll.txt;EarthBending-UnderstandingTheGravityOfSituations.txt;Firebending-IgnitingYourInnerFlame.txt";	
			ismanager = true;		
			break;
	}
}
