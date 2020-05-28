import React from 'react';
import CLink from './CLink';

export default class Pagination extends React.Component {
    render(){
		let props = this.props;
		let queryParam = props.queryParam ? props.queryParam : "";
        
		if (props.items == undefined || props.items.length <= 0) return null;
		let currentPage = parseInt(props.items.currentPage);

		let generatePages = () => {
			let pages = [];
			let start = 1;
			let end = 0;

			if (props.items.pageCount > 10) {
				end = 10;
			} else {
				end = props.items.pageCount;
			}
			if (this.currentPage > 5) {
				start = this.currentPage - 4;
				end = this.currentPage + 5 <= this.props.items.pageCount ? this.currentPage + 5 : this.props.items.pageCount;
			}
			if (this.currentPage > 5 && this.props.items.pageCount < 10) {
				start = 1;
				end = this.props.items.pageCount;
			}
			end = this.props.items.pageCount == end ? this.props.items.pageCount : end;
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
			if (pages == 1)
				return "";

			return pages;
		}


		let pages = generatePages();
		let link = this.props.link;
        return(
            <div className="container">
            {(props.items.pageCount < 2) ?
					(props.items.pageCount == 1) ? <p className="gsc_col-xs-12">No More Page</p> : ""
					:
						<ul className="pagination">
							<li className={parseInt(currentPage) > 1 ? "" : "disable"}>
									{currentPage - 1 >= 1 ? <CLink default={false} href={`${link}${queryParam}${parseInt(currentPage) - 1}`} default={false} title={"Previous Page"} >{"prev"}</CLink>
										: ""
									}
								</li>

								{pages && pages.map((item, index) =>
									<li key={index} className={(item == parseInt(currentPage)) ? 'active' : ''}>
										<CLink default={false} href={`${link}${queryParam}${item}`} title={`Page ${item} of ${props.items.pageCount}`}>{item}</CLink>
									</li>
								)}

								<li className={props.items.pageCount == currentPage ? "disable" : ""}>
									{props.items.pageCount != currentPage ? <CLink default={false} href={`${link}${queryParam}${currentPage + 1}`} title="next page" >next</CLink>
										: ""
									}
								</li>
							</ul>
				}
			
            </div>
        )
    }
}