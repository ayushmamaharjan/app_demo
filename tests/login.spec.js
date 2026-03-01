import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {

    await page.goto ('/');

    // await page.pause();
    
    const userName = page.locator("input#user-name");
    const password = page.locator('input#password');
    const login = page.locator('#login-button');

    await expect(userName).toBeEmpty();
    await expect(password).toBeEmpty();
    await expect(login).toBeVisible();

    await userName.fill ("standard_user");
    await password.fill ("secret_sauce");
    await login.click();

    //[After Login --------------- DASHBOARD]
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.shopping_cart_link')).toBeVisible();

     
    const productsToAdd = ['Sauce Labs Onesie','Sauce Labs Backpack', 'Test.allTheThings() T-Shirt (Red)','Sauce Labs Bike Light','Sauce Labs Fleece Jacket','Sauce Labs Bolt T-Shirt'];
  for (const name of productsToAdd) {
    const product = page.locator('.inventory_item', { hasText: name });
    await product.locator('button:has-text("Add to cart")').click();
  }
    
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');

    const cart = page.locator('.shopping_cart_container');
    await cart.click();
  
    //----------------REMOVE THE ITEMS FROM YOUR CART---------------------
    const removeProduct = ['Sauce Labs Backpack', 'Test.allTheThings() T-Shirt (Red)'];
  for (const itemName of removeProduct){
     const remove = page.locator('.cart_item', { has: page.locator('.inventory_item_name', {hasText: itemName})
  });
     await remove.locator('button:has-text("Remove")').click();
  }
    
    const continueShopping = page.locator('.cart_footer > button').nth(1); //nth (0) - for continue shopping and nth (1) for checkoout.
    await continueShopping.click();

    //----------------For the checkout after completion of the shopping-------------
    const checkoutInfo = page.locator('.checkout_info');
    await checkoutInfo.locator('#first-name').fill('Ayushma');
    await checkoutInfo.locator('#last-name').fill('Maharjan');
    await checkoutInfo.locator('#postal-code').fill('008');
    
    const checkoutButton = page.locator('#continue');
    await checkoutButton.click();

    //---------------TO REMOVE THE ITEMS ON THE CHECKOUT PAGE------------------
   const itemsToRemove = ['Sauce Labs Bolt T-Shirt'];
for (const itemName of itemsToRemove) {
  await page.locator('.inventory_item_name', { hasText: itemName }).click(); //Click item name on checkout page
  await page.locator('button[data-test="remove"]').click(); //Click Remove on item details page
}
  
  //--------------------Return back to checkout overview-----------
  await page.goBack();

  await expect (page.locator('.cart_item')).toHaveCount(3);
  

    //-----------------To CONFIRM AND FINISH THE CHECKOUT-------------
    // const cartFooter = page.locator('cart_footer > button').nth(1);
    const cartFooter = page.locator ('#finish');
    await cartFooter.click();
    const backHome = page.locator('#back-to-products');
    await backHome.click();

   //-----------------FOR LOGOUT SESSION--------------------------
    const menuButton = page.locator('.bm-burger-button button');
    await menuButton.waitFor({ state: 'visible' });
    await menuButton.click();

    const logout = page.locator('#logout_sidebar_link');
    await logout.waitFor({ state: 'visible' });
    await logout.click();

});