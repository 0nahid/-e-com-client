
interface PaginationProps {
    total?: number;
    limit?: number;
    currentPage?: number;
    setCurrentPage?: (page: number) => void;
    setLimit?: (limit: number) => void;
}

export default function Pagination({ total, limit, currentPage, setCurrentPage, setLimit }: PaginationProps) {
    if (!total || !limit || !currentPage || !setCurrentPage || !setLimit) return null;
    const totalPages = Math.ceil(total / limit);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(currentPage);
    return (
        <div className="btn-group mt-2">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`btn ${currentPage === page ? "btn-primary" : ""}`}
                    onClick={() => setCurrentPage && setCurrentPage(page)}
                >{page}</button>
            ))}

            {
                limit && setLimit && (
                    <div>
                        <select
                            className="btn btn-ghost" onChange={(e) => setLimit && setLimit(parseInt(e.target.value))
                            }>
                            {
                                [10, 15, 20].map((limit) => (
                                    <option key={limit} value={limit}>{limit}</option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
        </div>
    );
}