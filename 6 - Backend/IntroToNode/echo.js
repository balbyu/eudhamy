function echo(string, number) {
    Array.from(Array(number)).forEach((x, i) => {
        console.log(string);
      });
      
}

echo("Echo!!", 10);
echo("Tater Tots", 3);