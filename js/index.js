// When the form is submitted, take the value of the input and search GitHub for user matches using the User Search Endpoint.
const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    let searchInput = event.target.search.value;
    fetch(`https://api.github.com/search/users?q=${searchInput}`)
    .then(res => res.json())
    .then(res => res.items)
    .then(userListArr => buildUsers(userListArr))
})

// Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
function buildUsers(userListArr) {
    userListArr.forEach(userObj => {
        let userName = userObj.login;
        let avatar = userObj.avatar_url;
        let profileLink = userObj.url;
        //Display user list using DOM
        let userContainer = document.querySelector('#user-list');
        let div = document.createElement('div')
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        let p = document.createElement('p');

        h2.textContent = userName;
        h2.classList.add("user-name");
        img.src = avatar;
        p.textContent = profileLink;
        div.appendChild(h2)
        div.appendChild(p);
        div.appendChild(img)
        userContainer.appendChild(div);
    })
    handleNameClick();
}

// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
function handleNameClick() {
    const namesNode = document.querySelectorAll("h2.user-name");
    namesNode.forEach(nameEle => {
        nameEle.addEventListener('click', event => {
            const repoList = document.querySelector('ul#repos-list');
            let h2 = document.createElement('h2');
            const name = nameEle.innerText;
            h2.textContent = `${name}'s Repositories`
            repoList.appendChild(h2);
            fetch(`https://api.github.com/users/${name}/repos`)
            .then(res => res.json())
            .then(repoArr => buildRepository(repoArr));
        });
    })
}

// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
function buildRepository(repoArr) {
    repoArr.forEach(repoObj => {
        const repoList = document.querySelector('ul#repos-list');
        let p = document.createElement('p');
        p.textContent = repoObj.name;
        repoList.appendChild(p);
    })
}