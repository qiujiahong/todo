export default {
    data(){
        return{
            author: "Nick"
        }
    },
    render(){
        return (
            <div id="footer"  >
            <span>Written by {this.author}</span>
            </div>
        )
    }
}