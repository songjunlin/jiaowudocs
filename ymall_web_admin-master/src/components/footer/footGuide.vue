<template>
    <footer class="footerWrapper">
        <div class="footer" id="footer">
            <div class="f-logo-wrapper">
                <a href="">
                    <img src="../../../static/img/logo.png" alt="logo" class="f-logo"/>
                    <span class="f-logo-text">YMALL</span>
                </a>
            </div>
            <div class="f-friendlink">
                <ul>
                    <li><a href="">关于我们</a><span class="f-f-vline">|</span></li>
                    <li><a href="">联系我们</a><span class="f-f-vline">|</span></li>
                    <li><a href="">免责声明</a><span class="f-f-vline">|</span></li>
                    <li><a href="">广告合作</a></li>
                </ul>
            </div>
            <div class="f-copyright">
              <p>@Copyright:YMALL,XXXXXXXXXXX</p>
            </div>
        </div>
    </footer>
</template>
<script src="https://s95.cnzz.com/z_stat.php?id=1261863366&web_id=1261863366" language="JavaScript"></script>
<script>
    export default {

    }
</script>

<style scoped>
    .footerWrapper {
        background-color: #F5F5F5;
        width: 100%;
        padding: 20px 0;
    }

    .footer {
        width: 50%;
        margin: 0 auto;
    }

    .footer a {
        color: #666;
        text-decoration: none;
    }

    .footer .f-logo-wrapper {
        text-align: center;
        margin: 15px 0;
    }

    .footer .f-logo {
        border-radius: 50%;
        width: 40px;
        vertical-align: middle;
        height: 40px;
        border: 1px solid #ccc;
        margin-right: 10px;
    }

    .footer .f-logo-text {
        font-size: 22px;
    }

    .footer .f-friendlink {
        height: 25px;
    }

    .footer .f-friendlink ul {
        list-style: none;
        width: 437px;
        height: 25px;
        /* text-align: center; */
        margin: 0 auto;
    }

    .footer .f-friendlink ul li {
        float: left;
    }

    .footer .f-friendlink ul li + li {
        margin-left: 25px;
    }

    .footer .f-friendlink .f-f-vline {
        display: inline-block;
        width: 2px;
        color: #FFFFFF;
        height: 25px;
        padding-left: 25px;
    }

    .footer .f-copyright {
        text-align: center;
        margin: 15px auto;
    }

    .footer .f-copyright p {
        color: #999;
        font-size: 14px;

    }
</style>
