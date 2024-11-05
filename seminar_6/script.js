function genNumber(term){
	
	const btns = document.querySelectorAll(term);

	for (const btn of btns) {
		number = (Math.floor(Math.random() * 10)+1);
		btn.value = number;
	}
	
}

function losovat(){
	const btns = genNumber('.result');
	for (let i = 1; i < 7; i++) {
	textbox1 = document.getElementById("a"+i);
	textbox2 =document.getElementById("b"+i);
	console.log(textbox2);
	if(textbox1.value == textbox2.value){
		document.getElementById("a" + i).style.backgroundColor = "green";
		document.getElementById("b" + i).style.backgroundColor = "green";
	}else{
		document.getElementById("a" + i).style.backgroundColor = "red";
		document.getElementById("b" + i).style.backgroundColor = "red";
	}
	}

}