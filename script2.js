(function () {
    "use strict";

    const Menu = (function () {

        var leftPanel = document.getElementById("left-panel");
        var middlePanel = document.getElementById("middle-panel");

        (function getRestaurantData() {

            fetch("./restaurant_content.json")
                .then((res) => {
                    return res.json();
                }).then((data) => {

                    var menuData = data.menuSections;
                    renderMenu(menuData)
                })

        })()
        function renderMenu(menuData) {
            var leftMenuList = generateLeftMenuList(menuData);
            leftPanel.append(leftMenuList);

            var menuCards = generateMenuCards(menuData);
            middlePanel.append(menuCards);
        }

        function generateLeftMenuList(menuData) {

            var leftMenuList = document.createElement("ul");
            for (let index = 0; index < menuData.length; index++) {
                var leftMenuListItem = generateLeftMenuListItem(menuData[index]);
                if (leftMenuList.hasChildNodes() == false)
                    leftMenuListItem.classList.add("active-left");
                leftMenuList.append(leftMenuListItem);
            }
            return leftMenuList;

        }

        function generateLeftMenuListItem(menuItem) {
            var leftMenuListItem = document.createElement("li");
            leftMenuListItem.classList.add("left-menu-list");
            leftMenuListItem.classList.add(menuItem.sectionId);

            var leftMenuListItemAnchor = document.createElement("a");
            leftMenuListItemAnchor.setAttribute("href", "#" + menuItem.sectionId);
            leftMenuListItemAnchor.textContent = menuItem.sectionName;

            leftMenuListItem.append(leftMenuListItemAnchor);
            return leftMenuListItem;
        }

        function generateMenuCards(menuData) {

            var middleMenuData = document.createElement("div");
            middleMenuData.classList.add("all-sections")
            middleMenuData.id = "all-sections";

            for (let index = 0; index < menuData.length; index++) {
                var currentSection = menuData[index];
                var menuSection = generateMenuSection(currentSection);
                middleMenuData.append(menuSection);
            }

            return middleMenuData;
        }

        function generateMenuSection(currentSection) {

            var sectionItems = currentSection.sectionItems;
            var menuSection = document.createElement("div");
            menuSection.classList.add("section-menu");

            var menuType = generateMenuType(currentSection);

            menuSection.append(menuType);
            for (let index = 0; index < sectionItems.length; index++) {

                var currentItem = sectionItems[index];
                var itemCard = generateItemCard(currentItem);
                // console.log(currentItem)
                itemCard.id = currentItem.itemId;
                menuSection.append(itemCard);
            }
            // console.log(menuSection)
            return menuSection;
        }

        function generateMenuType(currentSection) {
            var menuType = document.createElement("div");
            menuType.classList.add("menu-type");

            var menuHeader = document.createElement("h2");
            menuHeader.classList.add("menu-header");
            menuHeader.id = currentSection.sectionId;
            menuHeader.textContent = currentSection.sectionName;


            var menuCount = document.createElement("span");
            menuCount.classList.add("menu-count");
            menuCount.textContent = currentSection.length;

            menuType.append(menuHeader);
            menuType.append(menuCount);

            return menuType;

        }

        function generateItemCard(currentItem) {
            var itemCard = document.createElement("div");
            
            itemCard.id = currentItem.itemId;
            var itemHead = generateItemHead(currentItem);
            // var itemDesc = generateItemDesc(currentItem);

            itemCard = itemHead;
            
            // itemCard.append(itemDesc);

            return itemCard;
        }

        function generateItemHead(currentItem) {
            var itemHead = document.createElement("div");
            itemHead.classList.add("item-card");

            var itemIntro = document.createElement("div");
            itemIntro.classList.add("item-intro");

            var itemName = document.createElement("div");
            itemName.classList.add("item-name");
            itemName.textContent = currentItem.itemName;

            var itemPrice = document.createElement("div");
            itemPrice.classList.add("item-price");
            itemPrice.textContent = ("$"+currentItem.itemPrice);

            var itemDesc = generateItemDesc(currentItem);

            itemIntro.append(itemName);
            itemIntro.append(itemPrice);
            itemIntro.append(itemDesc);

            var itemImage = document.createElement("div");
            itemImage.classList.add("item-img");

            var foodImage = document.createElement("img");
            foodImage.setAttribute("src", currentItem.itemImage);

            var addButtonLink = document.createElement("a");

            var addButton = document.createElement("button");
            addButton.classList.add("add-to-cart-btn")
            addButton.textContent = "Add";

            addButtonLink.append(addButton);

            itemImage.append(foodImage);
            itemImage.append(addButtonLink);

            itemHead.append(itemIntro);
            itemHead.append(itemImage);

            return itemHead;
        }

        function generateItemDesc(currentSection) {
            var itemDesc = document.createElement("div");
            itemDesc.classList.add("item-desc");

            var itemDescPara = document.createElement("p");
            itemDescPara.textContent = currentSection.itemDesc;

            itemDesc.append(itemDescPara);
            return itemDesc;
        }

        var leftMenuList = document.getElementsByClassName("left-menu-list");
        var sections = document.getElementsByClassName("menu-header");
        (function leftPanelHighligting() {
            window.addEventListener("scroll", function () {
                let currentItem = "";
                for (let index = 0; index < sections.length; index++) {
                    var sectionTop = sections[index].offsetTop;
                    if (pageYOffset >= (sectionTop - 250)) {
                        currentItem = sections[index].getAttribute("id");
                    }
                }

                for (let index = 0; index < leftMenuList.length; index++) {
                    leftMenuList[index].classList.remove("active-left");
                    if (leftMenuList[index].classList.contains(currentItem)) {
                        leftMenuList[index].classList.add("active-left");
                    }
                }
            })
        })()


    })()

    const Cart = (function () {

        const cartItems = [];
        const itemCount = new Map();
        var middlePanel = document.querySelector(".middle-panel");
        var rightPanel = document.querySelector(".right-panel");
        
        (function addButtonFunctioning() {

            middlePanel.addEventListener("click", function (e) {
                // console.log(e.target)
                if (e.target.classList.contains("add-to-cart-btn")) {
                    let clickedItem = e.target.closest(".item-card");
                    // console.log(clickedItem)
                    addToCart(clickedItem);
                    changeAddButtonHTML(e.target);
                    changeCartPanel()
                }
                if (e.target.classList.contains("plus-sign")) {
                    let clickedItem = e.target.closest(".item-card");
                    // console.log(clickedItem)
                    addToCart(clickedItem);
                    changeCartPanel()
                }
                if (e.target.classList.contains("minus-sign")) {
                    let clickedItem = e.target.closest(".item-card");
                    // console.log(clickedItem)
                    reduceItemCount(clickedItem);
                    changeCartPanel()
                }
            });

        })()
        
        rightPanel.addEventListener("click",function(e){
            // console.log("asdas")
            if(e.target.classList.contains("plus-sign")) {
                let clickedItem = e.target.closest(".cart-element");
                // console.log(clickedItem)
                addToCart(clickedItem);
                changeAddButtonHTML(clickedItem)
                console.log(middlePanel.querySelector("#"+clickedItem.id+" .item-count-in-button"))
                middlePanel.querySelector("#"+clickedItem.id+" .item-count-in-button").textContent = itemCount.get(middlePanel.querySelector("#"+clickedItem.id).id);
                changeCartPanel()
            }
            if (e.target.classList.contains("minus-sign")) {
                let clickedItem = e.target.closest(".cart-element");
                // console.log(clickedItem)
                reduceItemCount(clickedItem);
                changeAddButtonHTML(clickedItem)

                middlePanel.querySelector("#"+clickedItem.id+" .item-count-in-button").textContent = itemCount.get(middlePanel.querySelector("#"+clickedItem.id).id);
                changeCartPanel()
            }
        })
        

        function changeAddButtonHTML(item) {

            console.log(item)
            let newAddButton = getNewAddButton(item.id);

            item.parentNode.replaceChild(newAddButton, item);
        }

        function getNewAddButton(item){

            let newAddButton = document.createElement("div");
            newAddButton.classList.add("new-add-button");

            let minusSign = document.createElement("span");
            minusSign.classList.add("minus-sign");
            minusSign.textContent = "--";

            let itemCountInButton = document.createElement("span");
            itemCountInButton.classList.add("item-count-in-button");
            
            if(isNaN(itemCount.get(item))){
                itemCountInButton.textContent = "1"
            }
            else{
                itemCountInButton.textContent = itemCount.get(item);
            }
            

            let plusSign = document.createElement("span");
            plusSign.classList.add("plus-sign");
            plusSign.textContent = "+";

            newAddButton.appendChild(minusSign);
            newAddButton.appendChild(itemCountInButton);
            newAddButton.appendChild(plusSign);

            return newAddButton;
        }

        middlePanel.addEventListener("click",function(e){
            // console.log(e.target);
            if(e.target.classList.contains("plus-sign")){
                let currentItem = e.target.closest(".item-card");
                // console.log(currentItem.id)
                e.target.closest(".new-add-button").querySelector(".item-count-in-button").textContent = itemCount.get(currentItem.id)
            }

            if(e.target.classList.contains("minus-sign")){
                let currentItem = e.target.closest(".item-card");
                // console.log(currentItem.id)
                e.target.closest(".new-add-button").querySelector(".item-count-in-button").textContent = itemCount.get(currentItem.id)
            }
        })

        function addToCart(item) {
            // console.log(item);
            if(itemCount.has(item.id)){
                itemCount.set(item.id, itemCount.get(item.id)+1);
            }
            else{
                let newItem = {
                    id: item.id,
                    name: item.querySelector(".item-name").textContent,//item.children[0].children[0].textContent,
                    price: item.querySelector(".item-price").textContent//item.children[0].children[1].textContent,
                }
                cartItems.push(newItem);
                itemCount.set(item.id,1);
            }
            console.log(cartItems, itemCount);
        }

        function removeItem(item) {
            let index = 0;
            for( ; index < cartItems.length; index++){
                if(cartItems[index].id == item.id)
                    break;
            }
            cartItems.splice(index,1);

            if(itemCount.has(item.id)){
                itemCount.delete(item.id);
            }
        }

        function reduceItemCount(item) {
            // console.log(item)
            itemCount.set(item.id, itemCount.get(item.id)-1);
            if(itemCount.get(item.id) === 0){
                removeItem(item);

                var addButtonLink = document.createElement("a");
                // addButtonLink.setAttribute("href", "#");
                var addButton = document.createElement("button");
                addButton.classList.add("add-to-cart-btn")
                addButton.textContent = "Add";

                addButtonLink.append(addButton);

                // console.log(item.children[0].children[1].children[1])
                let currentButton = item.querySelector("a");
                currentButton.parentNode.replaceChild(addButtonLink,currentButton);
            }
            console.log(cartItems, itemCount);
        }

        function changeCartPanel(){

            if(cartItems.length > 0){

                if(rightPanel.querySelector(".empty-cart-container") !== null){
                    rightPanel.querySelector(".empty-cart-container").style.display = "none";
                }

                let cartContent = document.createElement("div");
                cartContent.classList.add("cart-content");

                let cartHeader = document.createElement("h2");
                cartHeader.textContent = "Cart";

                let cartItemStrength = document.createElement("div");
                cartItemStrength.classList.add("cart-item-strength");
                
                let cartStrength = 0, cartSubTotalValue = 0;
                itemCount.forEach(function(key,value) {
                    // console.log(key,value)
                    cartStrength += key;        
                });
                cartItemStrength.textContent = (cartStrength + " items");

                let cartElements = document.createElement("div");
                cartElements.classList.add("cart-elements");

                cartItems.forEach(element => {
                    let cartElement = document.createElement("div");
                    cartElement.classList.add("cart-element");
                    cartElement.id = element.id

                    let cartElementName = document.createElement("div");
                    cartElementName.classList.add("cart-element-name");
                    cartElementName.textContent= element.name;

                    let elementId = element.id;
                    let currentItem = document.getElementById(elementId)
                    // console.log(element)
                    // console.log(currentItem)
                    let cartElementQuantity = getNewAddButton(currentItem.id);

                    let cartItemPrice = document.createElement("div");
                    cartItemPrice.classList.add("cart-item-price");
                    cartItemPrice.textContent = (element.price);

                    cartSubTotalValue += cartElementQuantity.textContent.slice(2,3) * cartItemPrice.textContent.slice(1);

                    cartElement.append(cartElementName);
                    cartElement.append(cartElementQuantity);
                    cartElement.append(cartItemPrice);

                    cartElements.append(cartElement);
                })

                let cartSubTotal = document.createElement("div");
                cartSubTotal.classList.add("cart-subtotal");

                let cartSubTotalText = document.createElement("div");
                cartSubTotalText.classList.add("cart-subtotal-text");
                cartSubTotalText.textContent = "Cart Subtotal";

                let cartSubTotalPrice = document.createElement("div");
                cartSubTotalPrice.classList.add("cart-subtotal-price");
                cartSubTotalPrice.textContent = ("$"+cartSubTotalValue);

                cartSubTotal.append(cartSubTotalText);
                cartSubTotal.append(cartSubTotalPrice);

                let cartMessage = document.createElement("div");
                cartMessage.classList.add("cart-message");
                cartMessage.textContent = "Extra charges may apply"

                let checkoutButton = document.createElement("div");
                checkoutButton.classList.add("checkout-button");
                checkoutButton.textContent = "CHECKOUT ➡";

                cartContent.append(cartHeader);
                cartContent.append(cartItemStrength);
                cartContent.append(cartElements);
                cartContent.append(cartSubTotal);
                cartContent.append(cartMessage);
                cartContent.append(checkoutButton);

                rightPanel.replaceChild(cartContent,rightPanel.children[0]);
                
            }
            else{
                // console.log("asdasasdasd")
                rightPanel.querySelector(".cart-content").style.display = "none";
                rightPanel.querySelector(".empty-cart-container").style.display = "block";
            }
        }

        function init() {
            addToCart()
        }

        document.addEventListener('DOMContentLoaded', function () {
            init();
        });

    }) ()

})();