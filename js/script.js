!(function () {
    document.getElementById('ip').addEventListener('keyup',function(){
        let ip = this.value.replace(/([^0-9.])/g,'');
        this.value = ip;
        document.getElementById('ip_addr').innerHTML = ip;
    });
    document.getElementById('request').addEventListener('click',function(){
        let ip = document.getElementById('ip').value.replace(/([^0-9.])/g,'');
        let ip_sp = ip.split('.');
        let valid = true;
        if( ip_sp.length === 4 ){
            for(let i=0;i<4;i++) {
                if (parseInt(ip_sp[i]) < 0 || parseInt(ip_sp[i]) > 255) {
                    valid = false;
                }
            }
        }else{
            valid = false;
        }
        let tmp_div = document.createElement('DIV');
        if( valid ){
            document.getElementById('cli_line').style.display='none';
            tmp_div.innerHTML='';
            tmp_div.innerHTML='<span class="g">user@vm</span>:<span class="b">~</span>$ ping -c 4 '+ip+'<br>PING '+ip+' ('+ip+') 56(84) bytes of data';
            for(let i=1;i<5;i++) {
                setTimeout(function () {
                    let s = Math.floor(Math.random() * (9 - 7 + 1) ) + 7;
                    let m = Math.floor(Math.random() * (99 - 10 + 1) ) + 10;
                    let resp_div = document.createElement('DIV');
                    resp_div.innerHTML = '64 bytes from ' + ip + ': icmp_seq=1 ttl=56 time='+s+'.'+m+' ms';
                    document.getElementById('console-results').appendChild(resp_div);
                }, (i*1000), ip)
            }
            setTimeout(function () {
                let resp_div = document.createElement('DIV');
                resp_div.innerHTML = '--- '+ip+' ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, time 4006ms<br>rtt min/avg/max/mdev = 8.132/9.428/10.957/1.057 ms';
                if( ip === '8.8.8.8' ) {
                    resp_div.innerHTML += '<br>Flag: '+atob('QVJJU0hUSXtJQ01QLUlTLUZVTn0g');
                }
                document.getElementById('console-results').appendChild(resp_div);
                document.getElementById('cli_line').style.display = 'block';
                document.getElementById('ip_addr').innerHTML = '';
                document.getElementById('ip').value = '';
            },4100,ip)
        }else{
            tmp_div.innerHTML='<span class="g">user@vm</span>:<span class="b">~</span>$ ping -c 4 '+ip+'<br>ping: '+ip+': Name or service not known';
            document.getElementById('ip_addr').innerHTML = '';
            document.getElementById('ip').value = '';
        }
        document.getElementById('console-results').appendChild(tmp_div);
    });
})();
