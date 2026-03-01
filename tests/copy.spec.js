import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {

    await page.goto ('/');

    // const login = page.locator('login-box #login-button');
    // await login.click('form_group');
    await page.pause();
    
    const userName = page.locator("input#user-name");
    await userName.fill ("standard_user");

    const password = page.locator('input#password');
    await password.fill ("secret_sauce");

    // const login = page.locator('login-box > submit-button btn_action');
    // await login.click();

    // const login = page.locator ("button.submit-button");
    const login = page.locator('#login-button');
    await login.click();
     
    const productsToAdd = [
  'Sauce Labs Backpack',
  'Sauce Labs Onesie',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt'
];

for (const name of productsToAdd) {
  const product = page.locator('.inventory_item', { hasText: name });
  await product.locator('button:has-text("Add to cart")').click();
}

    // const addToCart = page.locator('.inventory_item button').nth(0); //for adding only one particular item.
    // await addToCart.click();


    const cart = page.locator('.shopping_cart_container');
    await cart.click();
  
    //REMOVE THE ITEMS FROM YOUR CART
    const remove = page.locator('.cart_list', {hasText: name})
    // const removeFromCart = page.locator('.cart_list > div').nth(2);
    // await removeFromCart.click(); //just clicks on the whole section, doesnot remove anything
    
    const continueShopping = page.locator('.cart_footer > button').nth(1); //nth (0) - for continue shopping and nth (1) for checkoout.
    await continueShopping.click();

    // For the checkout after completion of the shopping
    const checkoutInfo = page.locator('.checkout_info');
    await checkoutInfo.locator('#first-name').fill('Ayushma');
    await checkoutInfo.locator('#last-name').fill('Maharjan');
    await checkoutInfo.locator('#postal-code').fill('008');
    
    const checkoutButton = page.locator('#continue');
    await checkoutButton.click();

    //TO REMOVE THE ITEMS ON THE CHECKOUT PAGE 
    // const remove = page.locator('cart_list > cart item');
    // await remove.locator('#item_4_title_link').click();
    
    // await page.pause();

    // To CONFIRM AND FINISH THE CHECKOUT
    // const cartFooter = page.locator('cart_footer > button').nth(1);
    const cartFooter = page.locator ('#finish');
    await cartFooter.click();
    const backHome = page.locator('#back-to-products');
    await backHome.click();

    

//    const container = page.locator('cart_contents_container');
//    await container.click();

   

});