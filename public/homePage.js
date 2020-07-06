const logoutButton = new LogoutButton();

//Profile log out:
logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    };
  });
};

//User information:
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  };
});

//Currency rates:
const ratesBoard = new RatesBoard();

const updateStocks = () => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    };
  });
};

updateStocks();
setInterval(updateStocks, 60000);

//Money operations:
const moneyManager = new MoneyManager();

//Balance recharge:
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    console.log(response.data);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(false, 'Balance successfully recharged!');
    } else {
      moneyManager.setMessage(true, response.data);
    };
  });
};

//Currency exchange:
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(false, 'Exchange successfully completed!');
    } else {
      moneyManager.setMessage(true, response.data);
    };
  });
};

//Money transfer:
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(false, 'Transfer successfully completed!');
    } else {
      moneyManager.setMessage(true, response.data);
    };
  });
};

//Favorites:
const favoritesWidget = new FavoritesWidget();

// Initial favorites list request:
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  };
});

//Add user to favorites:
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(false, 'New user successfully added!');
    } else {
      favoritesWidget.setMessage(true, response.data);
    };
  });
};

//Delete user from favorites:
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(false, 'User successfully deleted!');
    } else {
      favoritesWidget.setMessage(true, response.data);
    };
  });
};

