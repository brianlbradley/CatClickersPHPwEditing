

 var model = {
    currentCat: null,
    adminVisible:false,
      cats:[
        {
          clickCount: 0,
          name: "Fluffy",
          imgSrc: "images/Fluffy.jpeg"
        },
        {
          clickCount: 0,
          name: "The Praying Kitty",
          imgSrc: "images/begging.jpeg"
        },
         {
          clickCount: 0,
          name: "Blacky",
          imgSrc: "images/blacky.jpeg"
        },
         {
          clickCount: 0,
          name: "Cleo",
          imgSrc: "images/Cleo.jpeg"
        },
         {
          clickCount: 0,
          name: "Tabby",
          imgSrc: "images/tabby.jpeg"
        }

      ]
 };

var octopus = {

	initialize: function() {
		model.currentCat = model.cats[0];
		//tells our views to initialize
		catView.initialize();
		catList.initialize();
        adminView.init();
	},
	getCurrentCat: function() {
		return model.currentCat;
	},

	 getCats: function() {
	 	 return model.cats;

	},

	setCurrentCat:function(cat){
		model.currentCat = cat;

	},
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();

  },



   updateFieldList: function() {
   var updateName = adminView.updateNameElement.value;
      model.currentCat.name = updateName;


   },

    refreshAdminFieldData: function() {
      adminView.updateNameElement.value = model.currentCat.name;

},

   toggleFieldList: function() {

   },


};

var catView = {

	initialize: function() {
        //store pointers to our DOM elements for easy accessibility later

        this.catName = document.getElementById("cat-name");
        this.catCount = document.getElementById("catCount");
        this.catPic = document.getElementById("catPicture");


     	//On Click increment the current cat picture
	    this.catPic.addEventListener('click', function() {
		octopus.incrementCounter();

	});
	this.render();
},

render: function() {
	//update the DOM elements with values from the current cat
	var currentCat = octopus.getCurrentCat();
	this.catCount.textContent = currentCat.clickCount;
	this.catName.textContent = currentCat.name;
	this.catPic.src = currentCat.imgSrc;
}
};


var catList = {
	initialize:function() {
		this.catListElem = document.getElementById("listofCats");

	this.render();
},

render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list


        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('p');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    adminView.render();

                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);

      }
   }

};

var adminView = {

  init: function() {

  	this.formElement =document.getElementById("adminview");
  	this.updateNameElement = document.getElementById("cat_name_input");
  	this.updateUrlElement = document.getElementById("url");
  	this.updateCatClicksElement = document.getElementById("numclicks");

//Admin form
  	this.$adminbtn =   document.getElementById("adminbtn");
    this.$adminbtn.addEventListener("click", function() {
         adminView.openAdminView();
        });

     this.$cancel = document.getElementById("cancel");
     this.$cancel.addEventListener("click", function() {
     	adminView.hideAdminView();
     });

      this.$save =document.getElementById("save");

      this.$save.addEventListener("click", function() {
			  octopus.updateFieldList();
              catView.render();
              catList.hide();
              catList.render(false);



      }
      	)

 this.render();  //render the correct values into the elements
  },

  openAdminView: function() {
  	   this.formElement.style.display = 'block';
  },

  hideAdminView: function() {
    	this.$formElement.style.display = "none";
  },

//update the DOM elements with values from the current cat
  render: function() {

			var displayedCat = octopus.getCurrentCat();

			   this.updateNameElement.value = displayedCat.name;
			   this.updateUrlElement.value = displayedCat.imgSrc;
			   this.updateCatClicksElement.value = displayedCat.clickCount;


},

};

octopus.initialize();


//var elem = document.getElementById('img'); //ThePicture
//elem.addEventListener('click', function(){
//var element = event.currentTarget;
  //     element.clk =(element.clk || 0) +1; //clk is made up doesn't have to be defined
	//   document.getElementById("counted").innerHTML ="This Kitty has been clicked " + element.clk + " times.";

  //the element has been clicked... do stuff here
//}, false);





//If you're using jQuery, you'll be adding the "click" event listener with jQuery.click().

//$('#my-elem').click(function(e) {
  //the element has been clicked... do stuff here
//});