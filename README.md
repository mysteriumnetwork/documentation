# Documentation

### Download

Project:
```
git clone git@github.com:mysteriumnetwork/documentation.git 
```

Hugo:

```
brew install hugo
```

### Run

```
hugo server --disableFastRender
```

### Open browser

http://localhost:1313/

### Writing content

Content files are located in content/ directory.

The 4 main folders are top level sections which are mapped via a custom menu. If changed, you should change the
 menu in `config/_default/menus.en.toml`
 
You will some directory files named `index.md`, this means that this directory is a "single page". If the directory
 contains `_index.md` this means that that page is a list type page.