# NoSQL Analysis for FlexiMart

## Section A: Limitations of RDBMS

Relational databases like MySQL are built around fixed table structures, which makes them less flexible for products that have different types of information. For example, laptops need specifications like RAM and processor, while shoes need size and color. Trying to store these varied attributes in one table often results in empty or unused columns, making the database messy and inefficient. Adding new product types also requires changing the schema, such as creating new tables or columns, which can disrupt existing applications. Handling nested data, like customer reviews with ratings, comments, and timestamps, is also complicated because it usually requires multiple tables and JOIN operations. For a business like FlexiMart, which wants a wide range of products and evolving data, a relational database can slow development and make managing information more complex.

## Section B: NoSQL Benefits

MongoDB is a document-based NoSQL database that solves these problems by being flexible and scalable. Its schema-less design  allows each product to have its own attributes without affecting other data—laptops can have RAM and processor, while shoes have size and color in the same collection. Embedded documents make it easy to store related data, such as customer reviews, directly inside the product record. This removes the need for multiple tables and complex JOINs, making queries faster and simpler. MongoDB also supports horizontal scaling , which means it can handle more products and more data across multiple servers efficiently. For FlexiMart, this flexibility makes it easy to manage a diverse product catalog, add new product types quickly, and store nested information like reviews—all without the limitations of a traditional relational database.

## Section C: Trade-offs 

Even though MongoDB is flexible, it has some drawbacks compared to MySQL. First, transactions are less strict —while modern MongoDB supports multi-document transactions, it isn’t as robust as the ACID transactions in relational databases, which can affect consistency for complex operations. Second, data integrity is weaker —MongoDB doesn’t enforce foreign keys, so developers need extra logic to maintain relationships between records. Also, querying highly relational data across multiple collections can be slower than using JOINs in SQL. These limitations mean MongoDB is best when flexibility and scalability matter more than strict relational rules.
