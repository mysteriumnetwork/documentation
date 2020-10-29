# Mysterium Network Documentation

## 🚀 Quick start

1.  **Install NodeJS + NPM**

    For macOS
    
    ```shell
    brew install node
    ```
    
    More information on how to install it can be found in [Gatsbyjs docs](https://www.gatsbyjs.com/tutorial/part-zero/).

1.  **Documentation project setup**

    Install Gatsby CLI
    
    ```shell
    npm install -g gatsby-cli
    ```
    
    Clone repository
    ```shell
    git clone git@github.com:mysteriumnetwork/documentation.git
    ```
    
    Navigate into project directory
    ```
    cd documentation
    ```
    
    Install project dependencies
    
    ```shell
    npm install
    ```

1.  **Start developing.**

    To start the live-reload server run

    ```shell
    gatsby develop
    ```
    
    To build static pages run
    ```shell
    gatsby build
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

1.  **Edit content or create a new page**
    Content is located in the `content/` directory.
    
    All pages must contain a title and description.
    ```
    ---
    title: Mission
    description: Censorship free internet for all
    ---
    
    ## Don't use #h1 to start the content as the page title is already h1
    Your content
    ```

## Tips

Navigations in Gatsby are hardcoded, your can find its configuration in the `navigation/` directory.

The sidebar navigation is located in `navigation/sidebar.js`.

Editing navigation requires that you restart the `gatsby develop` command in your terminal.
