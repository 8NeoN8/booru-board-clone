## URLS FOR API AND PAGES DATA
+ Example Post Id with comments: 4991637

+ Landing Page, Number Gifs for amount of posts: https://safebooru.org/counter/(0-9).gif

+ Browse Page, get the list of posts and information from the specified page ID with tags: https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${pageId}&limit=${amoutLimit}&tags=${allTags}&json=1

+ Browse Page, get the list of posts and information from the specified page ID without any tags, and with or without a limit of results: https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${pageId}&limit=${amountLimit}&json=1

+ Browse Page, shorthand url for the first page of any amount of tags: https://safebooru.org/index.php?page=post&s=list&tags=&{+tag1...+tagN}

+ Browse Page, search posts uploaded by a specific User: https://safebooru.org/index.php?page=post&s=list&tags=user:${username}

+ Post Page, information about a specific post: https://safebooru.org/index.php?page=dapi&s=post&q=index&id=${postId}&json=1

+ Post Page, get the comments of a post: https://safebooru.org/index.php?page=dapi&s=comment&q=index&post_id=${4959145}

+ Post Page, get the original img source of a post: https://safebooru.org//images/${directory}/${imageName}?${id}

+ Post Page, get the sample img source of a post: https://safebooru.org//sample/${directory}/sample_${imageName}?${id}

+ Get a Tag's information: https://safebooru.org/index.php?page=dapi&s=tag&q=index&name=${tag}

+ Tag search autocompletion url: https://safebooru.org/autocomplete.php?q=${input}

+