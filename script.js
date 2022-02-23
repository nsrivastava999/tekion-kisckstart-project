// fetch("./restaurant_content.json")
//     .then(res => console.log(res));

var sectionHTML = "";
var leftHTML = "<ul>";

function getRestaurantData(){
    fetch("./restaurant_content.json")
        .then((res)=> {
            return res.json();
        }).then((data)=>{
            // console.log(sectionData.menuSections.length);
            var sectionData = data.menuSections;

            for(let sectionIndex = 0; sectionIndex < sectionData.length; sectionIndex++){
                // console.log(sectionData[sectionIndex]);
                var currentSection = sectionData[sectionIndex];
                sectionHTML += "<div class=\"menu-section\">";
                sectionHTML += "<div class=\"menu-type\"> <h2 class=\"menu-header\" id=\""+currentSection.sectionId+"\">"+currentSection.sectionName;
                sectionHTML += "</h2> <span class=\"menu-count\">"+ currentSection.sectionItems.length +" items</span> </div>";

                leftHTML += "<li><a href=\"#"+currentSection.sectionId+"\">"+currentSection.sectionName+"</a></li>";
                // console.log(sectionHTML);
                var sectionItems = currentSection.sectionItems;
                for(let itemIndex = 0; itemIndex < sectionItems.length; itemIndex++){
                    var currentItem = sectionItems[itemIndex];
                    console.log(currentItem) 
                    sectionHTML += "<div class=\"item-card\"> <div class=\"item-head\"> <div class=\"item-intro\">"
                    sectionHTML += "<div class=\"item-name\">" + currentItem.itemName + "</div>"
                    sectionHTML += "<div class=\"item-price\">" + currentItem.itemPrice + "</div> </div>"
                    sectionHTML += "<div class=\"item-img\"> <img src=\"" + currentItem.itemImage + "\"> <a href=\"#\"><button>Add</button></a> </div> </div>"
                    sectionHTML += "<div class=\"item-desc\"> <p>"+ currentItem.itemDesc +"</p> </div> </div>"
                }
                sectionHTML += "</div>";
                console.log(sectionHTML);
            }
            document.querySelector(".middle-panel").innerHTML = sectionHTML;
            leftHTML += "</ul>";
            document.querySelector(".left-panel").innerHTML = leftHTML;

        }).catch(err => {
            console.log(err);
        })
}

getRestaurantData();