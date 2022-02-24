// // fetch("./restaurant_content.json")
// //     .then(res => console.log(res));

// var sectionHTML = "";
// var leftHTML = "<ul>";

// function getRestaurantData(){
//     fetch("./restaurant_content.json")
//         .then((res)=> {
//             return res.json();
//         }).then((data)=>{
//             // console.log(sectionData.menuSections.length);
//             var sectionData = data.menuSections;

//             for(let sectionIndex = 0; sectionIndex < sectionData.length; sectionIndex++){
//                 // console.log(sectionData[sectionIndex]);
//                 var currentSection = sectionData[sectionIndex];
//                 sectionHTML += "<div class=\"menu-section\">";
//                 sectionHTML += "<div class=\"menu-type\"> <h2 class=\"menu-header\" id=\""+currentSection.sectionId+"\">"+currentSection.sectionName;
//                 sectionHTML += "</h2> <span class=\"menu-count\">"+ currentSection.sectionItems.length +" items</span> </div>";

//                 leftHTML += "<li><a href=\"#"+currentSection.sectionId+"\">"+currentSection.sectionName+"</a></li>";
//                 // console.log(sectionHTML);
//                 var sectionItems = currentSection.sectionItems;
//                 for(let itemIndex = 0; itemIndex < sectionItems.length; itemIndex++){
//                     var currentItem = sectionItems[itemIndex];
//                     console.log(currentItem) 
//                     sectionHTML += "<div class=\"item-card\"> <div class=\"item-head\"> <div class=\"item-intro\">"
//                     sectionHTML += "<div class=\"item-name\">" + currentItem.itemName + "</div>"
//                     sectionHTML += "<div class=\"item-price\">" + currentItem.itemPrice + "</div> </div>"
//                     sectionHTML += "<div class=\"item-img\"> <img src=\"" + currentItem.itemImage + "\"> <a href=\"#\"><button>Add</button></a> </div> </div>"
//                     sectionHTML += "<div class=\"item-desc\"> <p>"+ currentItem.itemDesc +"</p> </div> </div>"
//                 }
//                 sectionHTML += "</div>";
//                 console.log(sectionHTML);
//             }
//             document.querySelector(".middle-panel").innerHTML = sectionHTML;
//             leftHTML += "</ul>";
//             document.querySelector(".left-panel").innerHTML = leftHTML;

//         }).catch(err => {
//             console.log(err);
//         })
// }

// getRestaurantData();

var leftPanel = document.getElementById("left-panel");
var middlePanel = document.getElementById("middle-panel");

function getRestaurantData() {
    fetch("./restaurant_content.json")
        .then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data.menuSections);
            var menuData = data.menuSections;

            var leftMenuList = generateLeftMenuList(menuData);
            // console.log(leftMenuList);
            leftPanel.append(leftMenuList);

            var menuCards = generateMenuCards(menuData);
            middlePanel.append(menuCards);
        })
}

function generateLeftMenuList(menuData){

    var leftMenuList = document.createElement("ul");
    for(let index = 0; index < menuData.length; index++){
        var leftMenuListItem = generateLeftMenuListItem(menuData[index]);
        leftMenuList.append(leftMenuListItem);
    }
    return leftMenuList;

}

function generateLeftMenuListItem(menuItem){
    var leftMenuListItem = document.createElement("li");

    var leftMenuListItemAnchor = document.createElement("a");
    leftMenuListItemAnchor.setAttribute("href","#"+menuItem.sectionId);
    leftMenuListItemAnchor.textContent = menuItem.sectionName;

    leftMenuListItem.append(leftMenuListItemAnchor);
    return leftMenuListItem;
}

function generateMenuCards(menuData){

    var middleMenuData = document.createElement("div");
    // console.log(menuData);

    for(let index = 0; index < menuData.length; index++){
        var currentSection = menuData[index];
        var menuSection = generateMenuSection(currentSection);
        middleMenuData.append(menuSection);
    }
    
    return middleMenuData;
}

function generateMenuSection(currentSection){

    var sectionItems = currentSection.sectionItems;
    var menuSection = document.createElement("div");
    var menuType = generateMenuType(currentSection);
    // console.log(currentSection)
    menuSection.append(menuType);
    for(let index = 0; index < sectionItems.length; index++){
        // console.log(currentSection[index]);
        var currentItem = sectionItems[index];
        var itemCard = generateItemCard(currentItem);
        menuSection.append(itemCard);
    }
    return menuSection;
}

function generateMenuType(currentSection){
    var menuType = document.createElement("div");

    var menuHeader = document.createElement("h2");
    menuHeader.classList.add("menu-header");
    menuHeader.id = currentSection.sectionId;
    menuHeader.textContent = currentSection.sectionName;
    // console.log(currentSection);

    var menuCount = document.createElement("span");
    menuCount.classList.add("menu-count");
    menuCount.textContent = currentSection.length;

    menuType.append(menuHeader);
    menuType.append(menuCount);

    return menuType;

}

function generateItemCard(currentItem){
    var itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    var itemHead = generateItemHead(currentItem);
    var itemDesc = generateItemDesc(currentItem);

    itemCard.append(itemHead);
    itemCard.append(itemDesc);

    return itemCard;
}

function generateItemHead(currentItem){
    var itemHead = document.createElement("div");
    itemHead.classList.add("item-head");

    var itemIntro = document.createElement("div");
    itemIntro.classList.add("item-intro");

    var itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.textContent = currentItem.itemName;

    var itemPrice = document.createElement("div");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = currentItem.itemPrice;

    itemIntro.append(itemName);
    itemIntro.append(itemPrice);

    var itemImage = document.createElement("div");
    itemImage.classList.add("item-img");

    var foodImage = document.createElement("img");
    foodImage.setAttribute("src",currentItem.itemImage);

    var addButtonLink = document.createElement("a");
    addButtonLink.setAttribute("href","#");

    var addButton = document.createElement("button");
    addButton.textContent = "Add";

    addButtonLink.append(addButton);

    itemImage.append(foodImage);
    itemImage.append(addButtonLink);

    itemHead.append(itemIntro);
    itemHead.append(itemImage);

    return itemHead;
}

function generateItemDesc(currentSection){
    var itemDesc = document.createElement("div");
    itemDesc.classList.add("item-desc");

    var itemDescPara = document.createElement("p");
    itemDescPara.textContent = currentSection.itemDesc;

    itemDesc.append(itemDescPara);
    return itemDesc;
}

getRestaurantData();