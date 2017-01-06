function getRandomInt(min, max, seed) //min, max are inclusive
{
	if (seed!=undefined)
	{
		var result = Math.floor(Math.abs(Math.sin(seed)) * (max - min + 1) + min);
		return result;
	}
	else
	{
		var result = Math.floor(Math.random() * (max - min + 1) + min);
		return result;
	}
}