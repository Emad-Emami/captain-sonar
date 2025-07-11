---
description: Platform routes and pages
icon: chart-network
---

# Routes

<details>

<summary>Index</summary>

* path: `/`
* &#x20;content: Game explanation

</details>

<details>

<summary>Home</summary>

* path: `/home`&#x20;
*   content:&#x20;

    main game menu

    * Create new battle ->  `/battle`
    * Find battle -> `/battles/search`
    * Exit -> `/logout`

</details>

<details>

<summary>Create new battle</summary>

* path: `/battle`
* logic: creates a new battle and redirects to `/battle/:battleId`

</details>

<details>

<summary>Battle</summary>

* path: `/battle/:battleId`
* contents: Allows user to assign waiting users as crew as the game owner

</details>

<details>

<summary>Find battle</summary>

* path: `/battles/search`&#x20;
* content: Let user search through all battles. can view pending, active or closed battles – users can join battles that are in pending state

</details>

<details>

<summary>Logout</summary>

* path: `/logout`
* logic: logs out and redirects to `/`

</details>

<details>

<summary>Login</summary>

* path:  `/login`&#x20;
* logic: logs in and redirects to home page (or any previously passed URL)

</details>
