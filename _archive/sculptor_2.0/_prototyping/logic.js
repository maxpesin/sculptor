function populate(s1,s2){
    
	var s1 = document.getElementById(s1);
	var s2 = document.getElementById(s2);
    
	s2.innerHTML = "Select Muscle Target";
    
	if(s1.value == "arms"){
		var optionArray = ["Select Muscle Target","Forearm","Backarm"];
    } 
    else if(s1.value == "back"){
		var optionArray = ["Select Muscle Target","Whole","Lats","Middle","Lower Back"];
	} 
    else if(s1.value == "biceps"){
		var optionArray = ["Select Muscle Target","Whole","Long Head","Short Head"];
	} 
    else if(s1.value == "chest"){
		var optionArray = ["Select Muscle Target","Upper","Middle","Lower"];
	} 
    else if(s1.value == "core"){
		var optionArray = ["Select Muscle Target","Whole","Upper","Side","Lower"];
	}
    else if(s1.value == "legs"){
		var optionArray = ["Select Muscle Target","Quads","Hamstrings","Hips","Calfs"];
	}
    else if(s1.value == "shoulders"){
		var optionArray = ["Select Muscle Target","Whole","Front","Side","Rear","Traps"];
	}
    else if(s1.value == "triceps"){
		var optionArray = ["Select Muscle Target","Whole","Long Head","Lateral Head","Medial Head"];
	} else ("Something went wrong!")
    
        
    for(var option in optionArray){
		var pair = optionArray[option];
		var newOption = document.createElement("option");
		newOption.value = pair;
		newOption.innerHTML = pair;
		s2.options.add(newOption);
	}
}

    function popExercise(s2,s3,s1){

    var exerciseS3 = document.getElementById(s3);
    var exerciseS2 = document.getElementById(s2);
    var exerciseS1 = document.getElementById(s1);
        
    var exercise;
        
	$.getJSON('core.json', function(data) {
        $.each(data, function(i,sculptor) {
            if (sculptor.muscleTarget == exerciseS2.value) {
                exercise+="<option value='"+sculptor.exercise+"'>"+sculptor.exercise+"</option>";
			 };
			 $(exerciseS3).html(exercise);
        });

			 });
};

/*
    var exerciseS1 = document.getElementById(s1);
    var exerciseS2 = document.getElementById(s2);
    var exerciseS3 = document.getElementById(s3);
    var muscleMajor = exerciseS1.value;
    var muscleTarget = exerciseS2.value;
        
        console.log(muscleMajor);
        console.log(muscleTarget);

    exerciseS3.onclick = function() {
    
    var exercise;
    
    exerciseS3.innerHTML = "";
    */
   