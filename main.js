const scrollContainer = document.getElementById('scroll-container');
        const canContainer = document.getElementById('can-container');

        let currentScroll = 0;
        let targetScroll = 0;

        
        scrollContainer.addEventListener('scroll', () => {
            targetScroll = scrollContainer.scrollTop;
        });

        
        function render() {
           
            currentScroll += (targetScroll - currentScroll) * 0.08;

            
            const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            
            
            if (maxScroll > 0) {
                
                const scrollFraction = currentScroll / maxScroll;
                
                
                const currentPosition = 75 - (50 * scrollFraction);
                canContainer.style.left = `${currentPosition}%`;
                
                
                const rotation = Math.sin(scrollFraction * Math.PI) * 20;
                
                
                const scale = 1 + Math.sin(scrollFraction * Math.PI) * 0.10;
                
                
                canContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
            }
        				
            requestAnimationFrame(render);
        }


        render();