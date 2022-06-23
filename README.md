# webscraping-test

## Choix de la stack
- **React** : techno maîtrisée
- **SSR** : n'apporte a priori pas grand chose au problème, à moins que l'on veuille se servir de l'application pour améliorer artificellement du SEO. Mais ici cela me permet d'avoir une seule base de code, et surtout je n'avais pas encore trouvé une occasion d'en faire jusque là. 
- **Cheerio** : après une recherche rapide, j'ai choisi une solution full JS, qui me semble plus simple et suffisante par rapport à l'usage d'un browser headless
- **Hapi** : je ne connaissais pas, alors autant en profiter pour découvrir le framework que vous utilisez 
- **AWS Elastic Beanstalk** : Service AWS jamais utilisé avant, me permet de découvrir le déploiement de serveur node.js

## Quelques réflexions 
Une des contraintes du web scraping est l'instabilité des sources et il faut pouvoir facilement mettre à jour là logique de parsing. Donc j'ai mis l'accent sur isolation des sources de données et des extracteurs de données, ainsi que la fault tolerance avec affichage à l'utilisateur 

## TODO List
- [x] Repository GitHub
- [x] README.md
- [x] Hapi get started : serveur web + route REST /
- [x] React SSR
- [ ] Composant search bar + button 
- [ ] If URL param /s/{query} => Web scraping Cheerio
- [ ] Source interface (URL builder, Data extractor key + type, return json)  
- [ ] Merge data by key
- [ ] Composant display table (1 column by source, URL, data according to type, error)
