---
layout: post
title:  Synthetic Test Collection
date:   2023-07-26 22:40:16
description: A short blog on Synthetic Test Collection
tags: Synthetic Data, LLM
categories: Research
---

Can we use Large Language Models (LLMs) to build reliable Synthetic Test Collection?

Many recent studeis have explored generating synthetic data using Large Language Models (LLMs) in various domains such as Computer Vision (CV) and Information Retrieval (IR). While previous work in IR exploited the capabilities of LLMs to generate synthetic queries or documents to augment training data for our-of-domain and our-of-distrubution generalisation, using LLMs for constructing Synthetic Test Collections is relatively unexplored.

## Why Construction Synthetic Test Collection?
Test collections play a vital role in evaluation of IR systems. Obtaining a diverse set of user queries for test collection construction can be challenging, and acquiring relevance judgments, which indicate the appropriateness of retrieved documents to a query, is often __costly__ and __resource-intensive__.

In our recent research study, we comperehensively investigate whether it is possible to use LLMs to construct fully synthetic test collections by generating synthetic queries and synthetic judgments. To generate the synthetic test collection, we proposed the following generation piepline:

<div class="row mt-6">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/synthetic-test-generation-piepline.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Synthetic Test Generation Piepline
</div>

1. <span class="font-weight-bold">Passage Selection:</span> We first randomly sampled 1000 passages from the MSMARCO v2 passage corpus.
2. <span class="font-weight-bold">Passage Filtering:</span> We then filtered for passages that could be good stand-alone search results using GPT-4.
3. <span class="font-weight-bold">Query Generation:</span> We generated queries using (i) a pre-trained T5-based query generation model from BeIR and (ii) a zero-shot query generation approach using GPT-4.
4. <span class="font-weight-bold">Query Selection:</span> We sampled the T5 query-passage pairs to match a target sample of positive qrels from the 2022 passage task; NIST assessors further removed queries that did not look reasonable and contained too few or too many relevant documents.
5. <span class="font-weight-bold">Relevance Judgment Generation:</span> We used GPT-4 to automatically label the documents (that were originally annotated using NIST annotators) for the synthetic queries to generate synthetic relevance judgements.

We compare our fully synthetic test collation with real test collection on system evalaution ordering to see if it is possible to obtain evaluation results that are similar to results obtained using real test collections. Our experiments indicate that using LLMs it is possible to construct synthetic test collections that can reliably be used for retrieval evaluation:

<div class="row mt-2">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/synthetic-test-generation-piepline.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/blogs/24-sigir-synthetic-data/synthetic-test-generation-piepline.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    The WordCloud of (a) Full, (b) SIRIP, (c) Doctoral Consortium papers
</div>

## Bias Analysis
A Major concernee
