# webscraping-test

## Contexte
POC réalisé en tant que du test technique dans le cadre d'un process de recrutement.

## Enoncé
**Objectif :** Afficher sur une page web des informations scrapées dynamiquement sur une entreprise donnée.
Tu développeras un back-end & un front-end qui permettront notamment d'afficher : le nom de l’entreprise, son logo, son nombre d’employés, son nombre de profils sur Linkedin…

Tu peux récupérer les données d'une ou plusieurs sources, comme par exemple LinkedIn, societe.com, …

## Conception et choix
J'ai abordé ce test technique comme une occassion d'apprendre de nouvelles choses (SSR, Hapi) et de réviser mes bases techniques. C'est pourquoi j'ai choisi de ne pas partir d'un Bootstrapper, mais de reconstruire les bases moi même et elles peuvent donc paraitre simplistes (pas de build notamment). 

Une des contraintes du web scraping est l'instabilité des sources et il faut pouvoir facilement mettre à jour la logique d'extraction. Donc j'ai mis l'accent sur isolation des sources de données et des extracteurs de données, ainsi que sur la Fault Tolerance avec feedback à l'utilisateur.

## Stack
- **[React](https://reactjs.org/)** : techno maîtrisée, en Typescript car j'ai beaucoup apprécié ma première expérience
- **[Chakra-UI](https://chakra-ui.com/)** : déjà utilisé sur un projet perso et j'ai beaucoup apprécié pour sa simplicité et rapidité de mise en place
- **SSR** : n'apporte a priori pas grand chose au problème (à moins que l'on veuille se servir de l'application pour améliorer artificellement du SEO), mais me permet d'avoir une seule base de code Front et Back. Et surtout je n'avais pas encore trouvé une occasion d'en faire jusque là
- **[Puppeteer](https://github.com/puppeteer/puppeteer)** : après avoir testé une solution basée sur Cheerio qui s'est révélée insuffisante, je suis passé par Puppeteer qui n'était finalement pas plus compliquée à mettre en oeuvre
- **[Hapi](https://hapi.dev/)** : je ne connaissais pas ce framework (pas plus que ExpressJS), alors autant en profiter pour commencer par celui-ci
- **[AWS Elastic Beanstalk](https://aws.amazon.com/fr/elasticbeanstalk/)** : service AWS jamais utilisé avant mais qui semble répondre au besoin de déploiement d'un serveur node.js

## TODO List
- [x] Repository GitHub
- [x] README.md
- [x] Bases (package.json, autoreload, linter)
- [x] Hapi Get started : web server + REST route /
- [x] React SSR
- [x] Component Search bar + button 
- [x] If query param => Web scraping logic Puppeteer
- [x] Source interface (URL builder, Data extractor, Result label + type)  
- [x] Extractor logic
- [x] Component Results display as table (1 column by source, URL, rendering according to type, error)
- [x] Additionnal sources and extractor logic genericization
- [x] Styling, refactoring and cleaning
- [x] Elastic Beanstalk deployment
- [x] Conclusion

## Limites connues
- La construction des URLs pour chaque source n'est pas du tout robuste, mais je pense que ce n'était aps l'enjeu du test technique. Comme solution envisagée, il aurait été possible de chercher des sources supplémentaires dans les sources explorées
- Je n'ai pas fait de tests... Il y a 3 fichiers qui auraient pu en mériter  

## Conclusion
- Très déçu du SSR, le mettre en place sur le First Load a été très simple, mais pour répondre à des cas d'usage plus réaliste la complexité grimpe en flèche. La solution consiste aujourd'hui à utiliser des frameworks comme Next.js ou Gatsby.
- Finalement j'ai décidé de développer la partie asynchrone de récupération des données côté serveur, avant de faire le rendu React après. Malheureusemet cela donne une expérience utilisateur vraiment mauvaise (15+s en cas de timeout).
- L'incompatibilité entre les moduldes CommonJS et ESM, et les ajustements de configuration à faire sans Bootstrapper m'ont vraiment pris beaucoup de temps, mais maintenant je pense avoir compris.
- Le déploiement sur Elastic Beanstalk était plus compliqué que je ne m'y attendais. Entre le packaging de tout le code nécessaire en zip et le fait que Puppeteer ne tourne pas par défaut sur des machines Amazon Linux, cela m'a demandé de creuser des sujets qui ne m'étais pas familier.