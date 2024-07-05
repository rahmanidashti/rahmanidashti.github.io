---
layout: post
title:  Synthetic Test Collection for Evaluation
date:   2024-07-04 22:40:16
description: A short blog on Synthetic Test Collection
tags: Synthetic Data LLM Evaluation
categories: Research
---

Can we use Large Language Models (LLMs) to build reliable Synthetic Test Collection?

Many recent studeis have explored generating synthetic data using Large Language Models (LLMs) in various domains such as Computer Vision (CV) and Information Retrieval (IR). While previous work in IR (see InPars [1](#references)) exploited the capabilities of LLMs to generate synthetic queries or documents to augment training data for our-of-domain and our-of-distrubution generalisation, using LLMs for constructing Synthetic Test Collections is relatively unexplored.

#### Why Construction Synthetic Test Collection?
Test collections play a vital role in evaluation of IR systems. Obtaining a diverse set of user queries for test collection construction can be challenging, and acquiring relevance judgments, which indicate the appropriateness of retrieved documents to a query, is often __costly__ and __resource-intensive__.

In our recent research study, we comperehensively investigate whether it is possible to use LLMs to construct fully synthetic test collections by generating synthetic queries and synthetic judgments. To generate the synthetic test collection, we proposed the following generation piepline:

<div class="row mt-6">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/synthetic-test-generation-piepline.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 1. Synthetic Test Generation Piepline
</div>

1. <span class="font-weight-bold">Passage Selection:</span> We first randomly sampled 1000 passages from the MSMARCO v2 passage corpus.
2. <span class="font-weight-bold">Passage Filtering:</span> We then filtered for passages that could be good stand-alone search results using GPT-4.
3. <span class="font-weight-bold">Query Generation:</span> We generated queries using (i) a pre-trained T5-based query generation model from BeIR and (ii) a zero-shot query generation approach using GPT-4.
4. <span class="font-weight-bold">Query Selection:</span> We sampled the T5 query-passage pairs to match a target sample of positive qrels from the 2022 passage task; NIST assessors further removed queries that did not look reasonable and contained too few or too many relevant documents.
5. <span class="font-weight-bold">Relevance Judgment Generation:</span> We used GPT-4 to automatically label the documents (that were originally annotated using NIST annotators) for the synthetic queries to generate synthetic relevance judgements.

We compare our fully synthetic test collation with real test collection on system evalaution ordering to see if it is possible to obtain evaluation results that are similar to results obtained using real test collections. Our experiments indicate that using LLMs it is possible to construct synthetic test collections that can reliably be used for retrieval evaluation:

<div class="row mt-2">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/full-real-vs-queries-synthetic.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/full-real-vs-full-synthetic.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 2. Scatter plot of the effectiveness (i.e., NDCG@10) of TREC DL 2023 runs according to the (1) real test collection and (b) synthetic test collection with human judgments. A point represents a single run averaged over all queries.
</div>

We evaluate the quality of the 31 systems from TREC DL 2023 using official judgments obtained from expert human assessors from NIST, and compare the ranking of these systems on real queries and synthetic queries. Figure 2(a) shows how the performance of systems using synthetically generated queries compare with system performance on real queries. It can be seen that synthetic queries and real queries show similar patterns in terms of evaluation results and system ranking, with a system ordering agreement of Kendall’s $$\tau$$ = 0.8151. More interestingly, when we extend our synthetic test collection to a fully synthetic test collection by generating synthetic relevance judgment the agreement shows a higher value, see Figure 2(b) Kendall's $$\tau$$ value of 0.8568. 

##### What could be the major issue when we use Synthetic Test Collection for evaluation?
One potential issue with using fully synthetic test collection construction is the possible bias these collections may exhibit towards systems that are based on a similar approach (similar language model) to the one that was used in the synthetic test collection construction process.

In order to answer to this questions, we extend our experients by categorising the systems based on the langaumge models or the architecture they used in their piepline. This reuslts four types of systems: systems based on `GPT`, `T5`, `GPT + T5` (i.e., a combination of GPT and T5), and `others` (i.e., traditional methods such as BM25, or any model that does not use either GPT or T5).

<div class="row mt-6">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/bias-analysis.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 3: Scatter plots of the effectiveness of TREC DL 2023 runs based on synthetic vs. real test collections to analyse the bias towards systems using the same language model as the one used in synthetic test collection construction.
</div>

While previous studies (see G-Eval [2](#references) paper for more detailed analysis) on LLM evaluation discussed the potential bias towards LLM-generated text when we use LLMs for evaluation, in our experiments we did not observe a very clear evidence of systematic bias. Our experiments (see Figure 3) shows that the synthetic test collection we have constructed that contains synthetic queries generated by LLMs (T5 and GPT-4) exhibits little to no bias towards LLM-based systems.

#### References
1. Luiz Bonifacio, Hugo Abonizio, Marzieh Fadaee, and Rodrigo Nogueira. "Inpars: Unsupervised dataset generation for information retrieval."In Proceedings of the 45th International ACM SIGIR Conference on Research and Development in Information Retrieval, pp. 2387-2392. 2022.

2. Liu, Yang, Dan Iter, Yichong Xu, Shuohang Wang, Ruochen Xu, and Chenguang Zhu. "G-eval: Nlg evaluation using gpt-4 with better human alignment." arXiv preprint arXiv:2303.16634 (2023).