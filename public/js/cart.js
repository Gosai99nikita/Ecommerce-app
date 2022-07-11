<script>
    function f(){
        document.querySelector('span').addEventListener('click',function(){
            if(document.querySelector('span').innerText=="♡")
            document.querySelector('span').innerText="❤️";
            else
            document.querySelector('span').innerText="♡";
            
        })
    }
</script>