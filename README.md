# webscraping-test

## Contexte
POC réalisé en tant que du test technique dans le cadre d'un process de recrutement.

## Enoncé
**Objectif :** Afficher sur une page web des informations scrapées dynamiquement sur une entreprise donnée.
Tu développeras un back-end & un front-end qui permettront notamment d'afficher : le nom de l’entreprise, son logo, son nombre d’employés, son nombre de profils sur Linkedin…

Tu peux récupérer les données d'une ou plusieurs sources, comme par exemple LinkedIn, societe.com, …

## Conception et choix
J'ai abordé ce test technique comme une occassion d'apprendre de nouvelles choses (SSR, Hapi) et de réviser mes bases techniques. C'est pourquoi j'ai choisi de ne pas partir d'un Bootstrapper, mais de reconstruire les bases moi même et donc elles peuvent paraitre simplistes. 

Une des contraintes du web scraping est l'instabilité des sources et il faut pouvoir facilement mettre à jour la logique d'extraction. Donc j'ai mis l'accent sur isolation des sources de données et des extracteurs de données, ainsi que sur la Fault Tolerance avec feedback à l'utilisateur.

## Stack
- **[React](https://reactjs.org/)** : techno maîtrisée
- **[Chakra-UI](https://chakra-ui.com/)** : déjà utilisé sur un projet perso et j'ai beaucoup apprécié pour sa simplicité et rapidité de mise en place
- **SSR** : n'apporte a priori pas grand chose au problème (à moins que l'on veuille se servir de l'application pour améliorer artificellement du SEO), mais me permet d'avoir une seule base de code Front et Back. Et surtout je n'avais pas encore trouvé une occasion d'en faire jusque là. Malheureusement ce n'était pas un bon choix...
- **[Puppeteer](https://github.com/puppeteer/puppeteer)** : après avoir testé une solution basée sur Cheerio qui s'est révélée insuffisante, je suis passé par Puppeteer qui n'était finalement pas plus compliquée
- **[Hapi](https://hapi.dev/)** : je ne connaissais pas ce framework que vous utilisez, alors autant en profiter pour le découvrir
- **[AWS Elastic Beanstalk](https://aws.amazon.com/fr/elasticbeanstalk/)** : Service AWS jamais utilisé avant, me permet de découvrir le déploiement de serveur node.js

## TODO List
- [x] Repository GitHub
- [x] README.md
- [x] Bases (package.json, autoreload, linter)
- [x] Hapi Get started : web server + REST route /
- [x] React SSR
- [x] Composant Search bar + button 
- [x] If query param => Web scraping logic Puppeteer
- [x] Source interface (URL builder, Data extractor, Result label + type)  
- [x] Extractor logic
- [x] Composant Results display as table (1 column by source, URL, display according to type, error)
- [x] Additionnal sources and extractor logic genericization
- [x] Styling, refactoring and cleaning
- [ ] Elastic Beanstalk deployment
- [ ] Conclusion

## Conclusion
- Très déçu du SSR, l'utiliser sur le First Load a été simplissime, mais pour des cas d'usage plus réel, la complexité grimpe en flèche. La solution réaliste consiste aujourd'hui à utiliser des frameworks comme Next.js ou Gatsby.
- Finalement j'ai décidé de laisser la partie asynchrone de récupération des données côté hapi et de faire le rendu React après. 
- la complexité des modules en JS et de leur incompatibilité