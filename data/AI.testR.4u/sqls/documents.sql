SELECT min(id), min(seq_id), segment_id, RTRIM(embedding_id, '0123456789'), min(created_at), max(created_at) FROM embeddings group by segment_id, RTRIM(embedding_id, '0123456789') order by min(id)
 